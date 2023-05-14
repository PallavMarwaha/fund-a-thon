from rest_framework import serializers
from rest_framework.validators import ValidationError

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

from dj_rest_auth.models import TokenModel
from .models import College, Student
from fundraisers.models import Fundraiser

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


class UserRegistrationSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    """

    password = serializers.CharField(max_length=128, validators=[validate_password])

    class Meta:
        model = User
        fields = (
            "first_name",
            "last_name",
            "email",
            "username",
            "is_student",
            "password",
        )
        extra_kwargs = {
            "username": {
                "error_messages": {
                    "required": "Give yourself a username",
                }
            },
            "email": {
                "error_messages": {
                    "required": "Give yourself an email",
                }
            },
            "password": {
                "required": True,
                "allow_blank": False,
            },
        }

    def validate(self, attrs):
        # For validating college_id if the user is a student
        if attrs.get("is_student") == True:
            college_id = self.context.get("college_id")
            try:
                College.objects.get(id=college_id)
                attrs["college_id"] = college_id
            except College.DoesNotExist:
                raise ValidationError("Could not find the college.")
        return attrs


class CollegeListSerializer(serializers.ModelSerializer):
    """
    Serializer for colleges list
    """

    full_name = serializers.SerializerMethodField("get_full_name")

    class Meta:
        model = College
        fields = ["id", "name", "city", "state", "full_name"]

    def get_full_name(self, obj):
        return f"{obj.name}, {obj.city}, {obj.state}"


class UserFundraisersListSerializer(serializers.ModelSerializer):
    """
    Serializer for active user fundraisers.
    """

    class Meta:
        model = Fundraiser
        fields = [
            "name",
            "slug",
            "about",
            "details",
            "photos",
            "created_at",
            "amount_required",
            "amount_raised",
        ]
