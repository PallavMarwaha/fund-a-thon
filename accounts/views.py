from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    renderer_classes,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import AllowAny
from rest_framework.authentication import (
    SessionAuthentication,
    BasicAuthentication,
    TokenAuthentication,
)

# Create your views here.


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([AllowAny])
def whoami(request):
    if request.user.is_authenticated:
        return Response({"is_authenticated": True, "username": request.user.username})

    return Response({"is_authenticated": False})
