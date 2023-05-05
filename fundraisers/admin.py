from django.contrib import admin

from .models import Fundraiser, Donation, FundraiserLike, FundraiserComment

# Register your models here.


class FunraiserAdmin(admin.ModelAdmin):
    readonly_fields = ("slug", "uuid")


admin.site.register(Fundraiser, FunraiserAdmin)
admin.site.register(Donation)
admin.site.register(FundraiserLike)
admin.site.register(FundraiserComment)
