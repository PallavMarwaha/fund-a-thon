from django.shortcuts import render
from django.db.models.functions import Lower
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    renderer_classes,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import AllowAny
from rest_framework.authentication import (
    SessionAuthentication,
    TokenAuthentication,
)

from django.contrib.auth import get_user_model

from .models import College
from fundraisers.models import Fundraiser
from .serializers import (
    CollegeListSerializer,
    UserRegistrationSerializer,
    UserFundraisersListSerializer,
    UserDashboardSerializer,
    UserProfileUpdateSerializer,
)
from fundraisers.decorators import is_student_required

User = get_user_model()


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([AllowAny])
def whoami(request):
    if request.user.is_authenticated:
        return Response(
            {
                "is_authenticated": True,
                "username": request.user.username,
                "first_name": request.user.first_name,
                "last_name": request.user.last_name,
            }
        )

    return Response({"is_authenticated": False})


@api_view(["POST"])
@permission_classes([AllowAny])
def register(request):
    """
    API endpoint for user registration.
    """
    if request.user.is_authenticated:
        return Response(
            {"details": "You are already logged in."}, status=status.HTTP_403_FORBIDDEN
        )

    serializer = UserRegistrationSerializer(
        data=request.data, context={"college_id": request.data.get("college_id")}
    )

    if serializer.is_valid():
        data = serializer.validated_data.copy()

        # Removes the unexpected fields error
        college_id = data.pop("college_id")

        user = User.objects.create_user(**data)

        if user.is_student == True:
            user.student.college_id = college_id
            user.student.save()
    else:
        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    return Response({"details": "User created successfully"})


@api_view(["GET"])
@permission_classes([AllowAny])
def get_colleges_list(request):
    """
    Returns a list of objects containing college info.
    """
    colleges = College.objects.all().order_by("name")

    serializer = CollegeListSerializer(colleges, many=True)
    return Response(serializer.data)


@api_view(["GET"])
def user_fundraisers_list(request):
    """
    Returns list of active user fundraisers with is_deleted=False filter.
    """
    user_fundraisers_list = request.user.get_active_fundraisers()

    # Search filter
    if (
        "q" in request.query_params
        and request.query_params.get("q") is not None
        and request.query_params.get("q").strip() != ""
    ):
        user_fundraisers_list = user_fundraisers_list.filter(
            name__icontains=request.query_params.get("q")
        )

    # Sort by filter
    if "sort" in request.query_params and request.query_params.get("sort") is not None:
        sort_by = request.query_params.get("sort").lower()
        user_fundraisers_list = user_fundraisers_list.order_by(Lower(sort_by))

    serializer = UserFundraisersListSerializer(user_fundraisers_list, many=True)

    return Response(serializer.data)


@api_view(["GET"])
# @is_student_required
def user_dashboard(request):
    """
    Returns user details such as name and their recent fundraisers info.
    """
    serializer = UserDashboardSerializer(request.user)

    return Response(serializer.data)


@api_view(["POST"])
def update_profile(request):
    """
    API endpoint for user registration.
    """
    serializer = UserProfileUpdateSerializer(data=request.data)

    if serializer.is_valid():
        fields_to_update_list = {}
        for key, value in serializer.data.items():
            if value is not None and value.strip() != "":
                fields_to_update_list[key] = value

        user_obj = User.objects.filter(id=request.user.id).update(
            **fields_to_update_list
        )

        updated_user_obj = User.objects.get(id=request.user.id)

        return Response(
            {
                "first_name": updated_user_obj.first_name,
                "last_name": updated_user_obj.last_name,
                "username": updated_user_obj.username,
            }
        )
    else:
        return Response(serializer.errors)
