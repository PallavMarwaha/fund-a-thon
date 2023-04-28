import uuid

from django.db import models
from djmoney.models.fields import MoneyField
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


def fundraiser_directory_path(instance, filename):
    """
    Called by FileField to get the photos path
    """
    return f"fundraisers/fundraiser_{instance.uuid}/{filename}"


class Fundraiser(models.Model):
    uuid = models.UUIDField(
        _("UUID for the fundraiser"), default=uuid.uuid4, editable=False
    )
    name = models.CharField(_("Name of the fundraiser"), max_length=120)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    details = models.TextField(_("Details regarding the fundraiser"))
    photos = models.FileField(upload_to=fundraiser_directory_path)
    amount_required = MoneyField(decimal_places=2, max_digits=5, default_currency="INR")
    amount_raised = MoneyField(decimal_places=2, max_digits=5, default_currency="INR")
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

    def __str__(self) -> str:
        return f"{self.name} by {self.user.get_full_name()}"
