from django.contrib import admin

from .models import Fundraiser, Donation

# Register your models here.

admin.site.register(Fundraiser)
admin.site.register(Donation)
