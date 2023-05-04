from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import College, Student
from django.contrib.auth.admin import UserAdmin

# Register your models here.


class CustomUserAdmin(UserAdmin):
    """
    Custom user admin for adding new fields from custom user model.
    """

    fieldsets = (
        *UserAdmin.fieldsets,  # original form fieldsets, expanded
        (  # new fieldset added on to the bottom
            "Other info",  # group heading of your choice; set to None for a blank space instead of a header
            {
                "fields": ("is_student",),
            },
        ),
    )


admin.site.register(get_user_model(), CustomUserAdmin)
admin.site.register(College)
admin.site.register(Student)
