from django.urls import path

from . import views

app_name = "fundraisers"

urlpatterns = [
    path("create/", views.create_fundraiser, name="create_fundraiser"),
    path("featured/", views.featured_fundraisers, name="featured_fundraisers"),
    path("<str:slug>/edit/", views.update_fundraiser, name="fundraiser_details"),
    path("<str:slug>/delete/", views.delete_fundraiser, name="fundraiser_details"),
    path("<str:slug>/", views.fundraiser_details, name="fundraiser_details"),
    path("", views.fundraisers_list, name="fundraisers_list"),
]
