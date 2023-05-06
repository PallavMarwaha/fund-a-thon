from django.shortcuts import render
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
)
from .models import Fundraiser


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
        fundraiser_obj = Fundraiser.objects.get(slug=slug)
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
    paginator = PageNumberPagination()
    paginator.page_size = 10
    fundraisers = Fundraiser.objects.all()

    result_page = paginator.paginate_queryset(fundraisers, request)

    serializer = FundraisersListSerializer(result_page, many=True)

    return paginator.get_paginated_response(serializer.data)
