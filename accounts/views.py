from django.shortcuts import render
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
from .serializers import CollegeListSerializer, UserRegistrationSerializer

User = get_user_model()


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([AllowAny])
def whoami(request):
    if request.user.is_authenticated:
        return Response({"is_authenticated": True, "username": request.user.username})

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
