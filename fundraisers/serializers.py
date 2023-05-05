from rest_framework import serializers
from rest_framework.exceptions import ValidationError
from djmoney.contrib.django_rest_framework import MoneyField
from djmoney.models.validators import MaxMoneyValidator, MinMoneyValidator

from .models import Fundraiser


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

    def create(self, validated_data):
        # To create a foreign key relationship with user
        user = self.context.get("user")

        if user is None:
            raise ValidationError(
                detail="Could not find user to associate with the fundraiser"
            )

        fundraiser_obj = Fundraiser.objects.create(**validated_data, user=user)

        return fundraiser_obj
