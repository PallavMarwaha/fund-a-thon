from django.shortcuts import render
from .decorators import is_student_required
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.authentication import (
    SessionAuthentication,
    TokenAuthentication,
)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@is_student_required
def create_fundraiser(request):
    return Response({"detail": "Hello world"})
