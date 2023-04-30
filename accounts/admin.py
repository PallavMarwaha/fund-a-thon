from django.contrib import admin
from django.contrib.auth import get_user_model
from .models import College, Student
from django.contrib.auth.admin import UserAdmin

# Register your models here.


class CustomUser(UserAdmin):
    pass


admin.site.register(get_user_model(), CustomUser)
admin.site.register(College)
admin.site.register(Student)
