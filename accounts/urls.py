from django.urls import path
from dj_rest_auth.views import LoginView, LogoutView

from . import views

app_name = "accounts"

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("whoami/", views.whoami, name="whoami"),
    path("register/", views.register, name="register"),
    path("colleges/", views.get_colleges_list, name="get_colleges_list"),
    path(
        "dashboard/fundraisers/",
        views.user_fundraisers_list,
        name="user_fundraisers_list",
    ),
    path("dashboard/", views.user_dashboard, name="user_dashboard"),
]
