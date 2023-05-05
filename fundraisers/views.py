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

from .serializers import CreateFundraiserSerializer


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@parser_classes([FormParser, MultiPartParser])
@is_student_required
def create_fundraiser(request):
    serializer = CreateFundraiserSerializer(
        data=request.data, context={"user": request.user}
    )

    if serializer.is_valid():
        serializer.save()
        return Response({"detail": "Fundraiser created successfully."})
    else:
        return Response(serializer.errors)
