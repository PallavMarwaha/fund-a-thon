from rest_framework import serializers
from django.contrib.auth import get_user_model

from dj_rest_auth.models import TokenModel

User = get_user_model()


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "username")


class CustomTokenSerializer(serializers.ModelSerializer):
    """
    Custom token serializer to return user info with the token key
    """

    user = UserInfoSerializer(many=False, read_only=True)

    class Meta:
        model = TokenModel
        fields = ("key", "user")
