from django.urls import path
from dj_rest_auth.views import LoginView, LogoutView

from . import views

app_name = "accounts"

urlpatterns = [
    path("login/", LoginView.as_view()),
    path("logout/", LogoutView.as_view()),
    path("whoami", views.whoami, name="whoami"),
]
