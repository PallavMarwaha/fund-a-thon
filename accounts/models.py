import uuid

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.contrib.auth.validators import ASCIIUsernameValidator
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


# Create your models here.
class CustomUser(PermissionsMixin, AbstractBaseUser):
    username_validator = ASCIIUsernameValidator()  # For English letters only

    uuid = models.UUIDField(
        _("Required. UUID for every user."), default=uuid.uuid4, editable=False
    )
    username = models.CharField(
        _("username"),
        max_length=30,
        unique=True,
        help_text=_(
            "Required. 30 characters or fewer. Letters, digits and " "@/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
            "required": _("Give yourself a username."),
        },
    )
    first_name = models.CharField(_("first name"), max_length=30, blank=True)
    last_name = models.CharField(_("last name"), max_length=30, blank=True)
    email = models.EmailField(
        _("email address"),
        unique=True,
        error_messages={
            "unique": _("A user with that email already exists."),
            "required": _("Give yourself an email."),
        },
    )
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin " "site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as "
            "active. Unselect this instead of deleting accounts."
        ),
    )
    is_student = models.BooleanField(
        default=False, help_text="Whether the user is a student or not."
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = [
        "email"  # When creating a user via the createsuperuser management command
    ]

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def clean(self):
        super().clean()
        # To save usernames in lowercase in the DB
        self.email = self.__class__.objects.normalize_email(self.email)
        self.username = self.username.lower()
        self.first_name = self.first_name.capitalize()
        self.last_name = self.last_name.capitalize()

    def save(self, *args, **kwargs):
        created = self.id is None
        super().save(*args, **kwargs)

        # Create corresponding Student model object
        if created and self.is_student:
            try:
                Student.objects.get(user=self)
            except Student.DoesNotExist:
                Student.objects.create(user=self)
        elif (not created) and self.is_student:
            try:
                Student.objects.get(user=self)
            except Student.DoesNotExist:
                Student.objects.create(user=self)

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        "Returns the short name for the user."
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)


class Student(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    college = models.ForeignKey("College", on_delete=models.RESTRICT, null=True)

    def __str__(self) -> str:
        if self.college is None:
            return f"{self.user.get_full_name()}"
        else:
            return f"{self.user.get_full_name()} - {self.college.name}"


class College(models.Model):
    name = models.CharField(max_length=120)
    city = models.CharField(max_length=120)
    state = models.CharField(max_length=120)
    is_deleted = models.BooleanField(default=False)  # For soft delete
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)

    class Meta:
        verbose_name = _("college")
        verbose_name_plural = _("colleges")

    def __str__(self) -> str:
        return f"{self.name}, {self.city}"

    def get_name_and_city(self):
        """
        Returns the college name and city.
        """
        return f"{self.name}, {self.city}"
