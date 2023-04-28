from django.contrib import admin

from .models import Fundraiser, Donation, FundraiserLike

# Register your models here.

admin.site.register(Fundraiser)
admin.site.register(Donation)
admin.site.register(FundraiserLike)
