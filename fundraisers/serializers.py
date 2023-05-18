from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from djmoney.contrib.django_rest_framework import MoneyField
from djmoney.models.validators import MaxMoneyValidator, MinMoneyValidator
from django.contrib.auth import get_user_model

from django.db.models import Sum, IntegerField
from django.db.models.functions import Coalesce

from .models import Fundraiser, FundraiserComment

User = get_user_model()


class CreateFundraiserSerializer(serializers.ModelSerializer):
    """
    Serializer for creating a new fundraiser
    """

    amount_required = MoneyField(
        max_digits=5,
        decimal_places=0,
        validators=[MinMoneyValidator(1000), MaxMoneyValidator(10000)],
        default_currency="INR",
    )

    class Meta:
        model = Fundraiser
        fields = [
            "name",
            "about",
            "details",
            "photos",
            "amount_required",
            "start_date",
            "end_date",
        ]
        extra_kwargs = {
            "name": {
                "error_messages": {
                    "invalid": "Fundraiser name is invalid",
                    "blank": "Fundraiser name is required",
                }
            },
            "about": {
                "error_messages": {
                    "invalid": "Fundraiser about is invalid",
                    "blank": "Fundraiser about is required",
                }
            },
            "details": {
                "error_messages": {
                    "invalid": "Fundraiser details are invalid",
                    "blank": "Fundraiser details are required",
                }
            },
            "amount_required": {
                "error_messages": {
                    "invalid": "Fundraiser amount is invalid",
                    "blank": "Fundraiser amount is required",
                }
            },
        }

    def create(self, validated_data):
        # To create a foreign key relationship with user
        user = self.context.get("user")

        if user is None:
            raise ValidationError(
                detail="Could not find user to associate with the fundraiser"
            )

        fundraiser_obj = Fundraiser.objects.create(**validated_data, user=user)

        return fundraiser_obj


class FundraiserUserDetailsSerializer(serializers.ModelSerializer):
    """
    Serializer for sharing user details for a fundraiser.
    """

    class Meta:
        model = User
        fields = ["first_name", "last_name", "email"]


class FundraiserCommentSerializer(serializers.ModelSerializer):
    """
    Serializer for sharing comment details about a fundraiser.
    """

    user = FundraiserUserDetailsSerializer()

    class Meta:
        model = FundraiserComment

        fields = ["user", "text", "created_at"]


class FundraiserDetailsSerializer(serializers.ModelSerializer):
    """
    Serializer for sharing details about a fundraiser.
    """

    user = FundraiserUserDetailsSerializer()
    comments = FundraiserCommentSerializer(many=True, source="fundraisercomment_set")
    amount_raised = serializers.SerializerMethodField()

    class Meta:
        model = Fundraiser
        fields = [
            "name",
            "slug",
            "about",
            "details",
            "user",
            "comments",
            "amount_required",
            "amount_raised",
            "photos",
            "start_date",
            "end_date",
            "created_at",
        ]

    def get_amount_raised(self, obj):
        return obj.donation_set.aggregate(
            amount_raised=Coalesce(Sum("amount_paid"), 0, output_field=IntegerField())
        ).get("amount_raised", 0)


class FundraisersListSerializer(serializers.ModelSerializer):
    """
    Serializes info for fundraisers list view.
    """

    user = FundraiserUserDetailsSerializer()

    class Meta:
        model = Fundraiser
        fields = [
            "name",
            "photos",
            "about",
            "user",
            "details",
            "slug",
            "start_date",
            "end_date",
            "created_at",
        ]


class FundraiserUpdateSerializer(serializers.ModelSerializer):
    """
    Serializer for updating the fundraiser info such as name, about, details and photos etc.
    """

    # TODO: Add field to model
    other_photos = serializers.ListField(child=serializers.FileField(), required=False)

    photos = serializers.FileField(required=False)

    class Meta:
        model = Fundraiser
        fields = ["name", "about", "details", "photos", "other_photos"]
