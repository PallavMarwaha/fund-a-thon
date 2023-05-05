from django.urls import path

from . import views

app_name = "fundraisers"

urlpatterns = [path("create/", views.create_fundraiser, name="create_fundraiser")]
