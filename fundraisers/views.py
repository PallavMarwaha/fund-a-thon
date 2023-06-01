from django.shortcuts import render
from django.db.models import Count

from .decorators import is_student_required
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
    parser_classes,
)
from rest_framework.authentication import (
    SessionAuthentication,
    TokenAuthentication,
)
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination

from .serializers import (
    CreateFundraiserSerializer,
    FundraiserDetailsSerializer,
    FundraisersListSerializer,
    FundraiserUpdateSerializer,
)
from .models import Fundraiser, FundraiserComment


class CustomPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response(
            {
                "next": self.get_next_link(),
                "previous": self.get_previous_link(),
                "count": self.page.paginator.count,
                "total_pages": self.page.paginator.num_pages,
                "results": data,
            }
        )


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@parser_classes([FormParser, MultiPartParser])
@is_student_required
def create_fundraiser(request):
    """
    API endpoint to create a new fundraiser. Authentication and authorization required.
    """
    serializer = CreateFundraiserSerializer(
        data=request.data, context={"user": request.user}
    )

    if serializer.is_valid():
        serializer.save()
        return Response({"detail": "Fundraiser created successfully."})
    else:
        return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


@api_view(["GET"])
@permission_classes([AllowAny])
def fundraiser_details(request, slug):
    """
    API endpoint for returning fundraiser details matched against the fundraiser slug.
    Returns fundraiser details including user details or 404 if not available.
    """
    try:
        fundraiser_obj = Fundraiser.objects.get(slug=slug, is_deleted=False)
    except Fundraiser.DoesNotExist:
        return Response(
            {"detail": "Fundraiser not found"},
            status=status.HTTP_404_NOT_FOUND,
        )

    serializer = FundraiserDetailsSerializer(fundraiser_obj)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def fundraisers_list(request):
    """
    API endpoint to return paginated fundraisers list
    """
    paginator = CustomPagination()
    paginator.page_size = 12
    fundraisers = Fundraiser.objects.filter(is_deleted=False).order_by("name")

    result_page = paginator.paginate_queryset(fundraisers, request)

    serializer = FundraisersListSerializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def featured_fundraisers(request):
    """
    API endpoint to return a list of features fundraisers for homepage.
    """

    fundraisers = (
        Fundraiser.objects.filter(is_deleted=False)
        .annotate(total_likes=Count("fundraiserlike"))
        .order_by("-total_likes")
    )[:9]

    paginator = CustomPagination()
    paginator.page_size = 3
    result_page = paginator.paginate_queryset(fundraisers, request)

    serializer = FundraisersListSerializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)


@api_view(["GET", "POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@is_student_required
def update_fundraiser(request, slug):
    """
    API endpoint to update a fundraiser.
    """

    try:
        fundraiser_obj = Fundraiser.objects.get(
            slug=slug, user=request.user, is_deleted=False
        )
    except Fundraiser.DoesNotExist:
        return Response(
            {"detail": "Fundraiser not found."}, status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "GET":
        serializer = FundraiserDetailsSerializer(fundraiser_obj)

        return Response(serializer.data)

    if request.method == "POST":
        serializer = FundraiserUpdateSerializer(
            instance=fundraiser_obj, data=request.data, partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@is_student_required
def delete_fundraiser(request, slug):
    """
    API endpoint to update a fundraiser.
    """

    try:
        fundraiser_obj = Fundraiser.objects.get(slug=slug, user=request.user)
    except Fundraiser.DoesNotExist:
        return Response(
            {"detail": "Fundraiser not found."}, status=status.HTTP_404_NOT_FOUND
        )

    fundraiser_obj.is_deleted = True
    fundraiser_obj.save()

    return Response({"detail": "Fundraiser deleted successfully"})


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
def comments(request, slug):
    try:
        fundraiser_obj = Fundraiser.objects.get(slug=slug)
    except Fundraiser.DoesNotExist:
        return Response(
            {"detail": "Fundraiser not found."}, status=status.HTTP_404_NOT_FOUND
        )

    comment = request.data.get("comment")

    if comment is None or comment.strip() == "":
        return Response(
            {"detail": "Invalid comment"}, status=status.HTTP_400_BAD_REQUEST
        )

    fc_obj = FundraiserComment.objects.create(
        fundraiser=fundraiser_obj, user=request.user, text=comment
    )

    return Response()
