from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from djmoney.contrib.django_rest_framework import MoneyField
from djmoney.models.validators import MaxMoneyValidator, MinMoneyValidator
from django.contrib.auth import get_user_model

from .models import Fundraiser

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


class FundraiserDetailsSerializer(serializers.ModelSerializer):
    """
    Serializer for sharing details about a fundraiser.
    """

    user = FundraiserUserDetailsSerializer()

    class Meta:
        model = Fundraiser
        fields = [
            "name",
            "slug",
            "about",
            "details",
            "user",
            "amount_required",
            "amount_raised",
            "photos",
            "start_date",
            "end_date",
            "created_at",
        ]
