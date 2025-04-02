"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from api.views import google_auth, CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from dj_rest_auth.views import LoginView

from api.views import send_registration_email
from api.views import verify_email
from api.views import CheckVerifiedView
from api.views import CheckEmailExistsView
from api.views import forgot_password
from api.views import reset_password


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("auth/", include("dj_rest_auth.urls")),
    path("auth/registration/", include("dj_rest_auth.registration.urls")),
    path("auth/google/", google_auth, name="google_auth"),
    path("auth/login/", LoginView.as_view(), name="rest_login"),
    path("create-user/", CreateUserView.as_view(), name="create_user"),
    path(
        "send-registration-email/",
        send_registration_email,
        name="send_registration_email",
    ),
    path("verify-email/<uidb64>/<token>/", verify_email, name="verify_email"),
    path("api/check-verified/", CheckVerifiedView.as_view(), name="check_verified"),
    path(
        "api/check-user-exists/",
        CheckEmailExistsView.as_view(),
        name="check_user_exists",
    ),
    path("forgot-password/", forgot_password, name="forgot-password"),
    path("reset-password/<uidb64>/<token>/", reset_password, name="reset-password"),
]
