from rest_framework import serializers
from rest_framework.validators import ValidationError

from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.db.models import Sum

from dj_rest_auth.models import TokenModel
from .models import College, Student
from fundraisers.models import Fundraiser

User = get_user_model()


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "username", "is_student")


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


class UserDashboardSerializer(serializers.ModelSerializer):
    """
    Serializer for user dashboard. Returns user fundraisers and total_funds_raised etc.
    """

    recent_fundraisers = serializers.SerializerMethodField()
    total_funds_raised = serializers.SerializerMethodField()
    total_fundraisers = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "email",
            "recent_fundraisers",
            "total_funds_raised",
            "total_fundraisers",
        ]

    def get_recent_fundraisers(self, obj):
        recent_fundraisers = obj.get_active_fundraisers().order_by("-created_at")[:10]
        serializer = UserFundraisersListSerializer(recent_fundraisers, many=True)
        return serializer.data

    def get_total_fundraisers(self, obj):
        return obj.get_active_fundraisers().count()

    def get_total_funds_raised(self, obj):
        return (
            obj.get_active_fundraisers()
            .aggregate(total_amount_raised=Sum("amount_raised"))
            .get("total_amount_raised", 0)
        )


class UserProfileUpdateSerializer(serializers.Serializer):
    """
    Serializer for updating user settings. Not used for updating, just deserializing.
    """

    first_name = serializers.CharField(required=False, max_length=120, allow_blank=True)
    last_name = serializers.CharField(required=False, max_length=120, allow_blank=True)
    username = serializers.CharField(required=False, max_length=120, allow_blank=True)
    password1 = serializers.CharField(
        required=False,
        validators=[validate_password],
        max_length=120,
        allow_blank=True,
    )
    password2 = serializers.CharField(
        required=False,
        validators=[validate_password],
        max_length=120,
        allow_blank=True,
    )
    password = serializers.SerializerMethodField()

    class Meta:
        extra_kwargs = {
            "password1": {"write_only": True},
            "password2": {"write_only": True},
            "password2": {"write_only": True},
        }

    def validate(self, attrs):
        password1 = attrs.get("password1")
        password2 = attrs.get("password2")

        if (password1 and password2) and password1 != password2:
            raise serializers.ValidationError({"password": ["Passwords do not match"]})

        return attrs

    def get_password(self, obj):
        return obj.get("password1", "")
