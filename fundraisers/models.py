import uuid
import secrets

from django.db import models
from djmoney.models.fields import MoneyField
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _
from django.utils.text import slugify
from djmoney.models.validators import MaxMoneyValidator, MinMoneyValidator

User = get_user_model()


def fundraiser_directory_path(instance, filename):
    """
    Called by FileField to get the photos path
    """
    return f"fundraisers/fundraiser_{instance.uuid}/{secrets.token_hex(10)}_{filename}"


class Fundraiser(models.Model):
    uuid = models.UUIDField(_("UUID for the fundraiser"), default=uuid.uuid4)
    name = models.CharField(
        _("Name of the fundraiser"),
        max_length=120,
        error_messages={
            "blank": "Fundraiser name is required.",
            "required": "Fundraiser name is required",
        },
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.SlugField(blank=True, null=True, unique=True)
    about = models.TextField(
        _("Introduction regarding the fundraiser"),
        error_messages={"blank": "About field cannot be blank"},
    )
    details = models.TextField(
        _("Details regarding the fundraiser"),
        error_messages={
            "blank": "Fundraiser details are required.",
            "required": "Fundraiser details are required",
        },
    )
    photos = models.FileField(upload_to=fundraiser_directory_path)
    amount_required = MoneyField(
        decimal_places=0,
        max_digits=5,
        default_currency="INR",
        validators=[MinMoneyValidator(1000), MaxMoneyValidator(10000)],
    )
    amount_raised = MoneyField(
        decimal_places=0,
        max_digits=5,
        default_currency="INR",
        validators=[MaxMoneyValidator(10000)],
        default=0,
    )
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_deleted = models.BooleanField(
        default=False,
        verbose_name="Is the fundraiser deleted by the user?",
        help_text="Used for soft delete",
    )
    is_published = models.BooleanField(
        default=False, help_text="Whether it's published or in draft."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __init__(self, *args, **kwargs):
        super(Fundraiser, self).__init__(*args, **kwargs)

        # To only update the slug when the name changes in save method
        # else it changes slug every time with random hex
        self.old_name = self.name

    def save(self, *args, **kwargs):
        if self.old_name and not (self.old_name == self.name):
            self.slug = slugify(f"{self.name} {secrets.token_hex(10)}")
        super(Fundraiser, self).save(*args, **kwargs)

    def __str__(self) -> str:
        return f"{self.name} by {self.user.get_full_name()}"


class Donation(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    # user = models.ForeignKey(User, on_delete=models.RESTRICT)  # Who paid the donation
    fundraiser = models.ForeignKey(Fundraiser, on_delete=models.RESTRICT)
    amount_paid = MoneyField(decimal_places=2, max_digits=5, default_currency="INR")
    paid_at = models.DateTimeField(auto_now_add=True)
    payment_info = models.JSONField()
    payment_status = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.fundraiser} - {self.amount_paid}"


class Order(models.Model):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False)
    fundraiser = models.ForeignKey(Fundraiser, on_delete=models.RESTRICT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    amount_paid = MoneyField(decimal_places=2, max_digits=5, default_currency="INR")


class FundraiserLike(models.Model):
    fundraiser = models.ForeignKey(Fundraiser, on_delete=models.RESTRICT)
    user = models.ForeignKey(User, on_delete=models.RESTRICT)
    liked_at = models.DateTimeField(auto_now_add=True)
    has_liked = models.BooleanField(
        default=False, help_text="Used for toggle like/unlike"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    class Meta:
        verbose_name = "FundraiserLike"

    def __str__(self) -> str:
        return f"{self.fundraiser.name} - {self.user.get_full_name()}"


class FundraiserComment(models.Model):
    fundraiser = models.ForeignKey(Fundraiser, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(help_text="User's comment on the fundraiser")
    commented_at = models.DateTimeField()
    is_deleted = models.BooleanField(default=False, help_text="Used for soft delete")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    class Meta:
        verbose_name = "FundraiserComment"

    def __str__(self) -> str:
        return f'F:{self.fundraiser.name} - "{self.text[:10]}" by {self.user.get_full_name()}'
