from django.conf import settings
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.tokens import default_token_generator
from django.http import JsonResponse
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, permissions, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from google.oauth2 import id_token
from google.auth.transport import requests
import json

from .models import CustomUser
from .serializers import UserSerializer
from .utils.emails import send_email_via_gmail

User = get_user_model()

# -----------------------------------------
# 1. GOOGLE AUTHENTICATION
# -----------------------------------------


@api_view(["POST"])
@permission_classes([AllowAny])
def google_auth(request):
    token = request.data.get("credential")
    if not token:
        return Response({"error": "Token is required"}, status=400)

    try:
        payload = id_token.verify_oauth2_token(
            token, requests.Request(), settings.GOOGLE_OAUTH_CLIENT_ID
        )
        if payload["aud"] != settings.GOOGLE_OAUTH_CLIENT_ID:
            return Response({"error": "Invalid Client ID"}, status=400)

        email = payload.get("email")
        name = payload.get("name")

        print("Google Email:", email)
        print("Google Name:", name)

        user = User.objects.filter(email=email).first()

        if user:
            return Response(
                {
                    "error": "An account with this email already exists. Please log in using your password."
                },
                status=400,
            )

        user = User.objects.create(email=email)
        user.save()

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "email": str(email),
                "name": str(name),
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }
        )

    except ValueError:
        return Response({"error": "Invalid token"}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=400)


# -----------------------------------------
# 2. USER REGISTRATION & CREATION
# -----------------------------------------


class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# -----------------------------------------
# 3. EMAIL VERIFICATION (SEND & VERIFY)
# -----------------------------------------


@csrf_exempt
def send_registration_email(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            email = data.get("email")

            user = CustomUser.objects.filter(email=email).first()
            if not user:
                return JsonResponse(
                    {"status": "error", "message": "User not found"}, status=400
                )

            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            verification_url = f"http://localhost:5173/verify-email/{uid}/{token}"

            send_email_via_gmail(
                subject="Verify your email",
                message=f"Click the link to verify your account: {verification_url}",
                recipient_email=email,
            )

            return JsonResponse(
                {"status": "success", "message": "Verification email sent"}
            )
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)
    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=400
    )


@api_view(["GET"])
@permission_classes([AllowAny])
def verify_email(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)
        if default_token_generator.check_token(user, token):
            user.verified = True
            user.save()
            return JsonResponse({"status": "success", "message": "Email verified"})
        else:
            return JsonResponse(
                {"status": "error", "message": "Invalid token"}, status=400
            )
    except CustomUser.DoesNotExist:
        return JsonResponse(
            {"status": "error", "message": "User not found"}, status=400
        )
    except Exception as e:
        return JsonResponse({"status": "error", "message": str(e)}, status=400)


# -----------------------------------------
# 4. CHECK EMAIL VERIFICATION STATUS
# -----------------------------------------


class CheckVerifiedView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({"verified": user.verified}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def forgot_password(request):
    email = request.data.get("email")
    user = CustomUser.objects.filter(email=email).first()

    if not user:
        return Response({"status": "error", "message": "User not found"}, status=400)

    try:
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:5173/reset-password/{uid}/{token}/"

        send_email_via_gmail(
            subject="Reset Your Password",
            message=f"Click the link to reset your password: {reset_link}",
            recipient_email=email,
        )

        return Response({"status": "success", "message": "Password reset email sent"})

    except Exception as e:
        return Response({"status": "error", "message": str(e)}, status=500)


@api_view(["POST"])
@permission_classes([AllowAny])
@csrf_exempt
def reset_password(request, uidb64, token):
    try:
        # Decode user ID
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)

        # Validate token
        if not default_token_generator.check_token(user, token):
            return Response(
                {"status": "error", "message": "Invalid or expired token"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Get new password from request
        new_password = request.data.get("password")

        # Validate password exists
        if not new_password:
            return Response(
                {"status": "error", "message": "Password is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create a temporary user instance to validate the password
        temp_user = CustomUser(email="temp@example.com", password=new_password)

        try:
            # This will trigger all your model validators
            temp_user.full_clean()
        except ValidationError as e:
            # Convert validation errors to user-friendly messages
            errors = []
            if "password" in e.message_dict:
                for error in e.message_dict["password"]:
                    errors.append(error)
            return Response(
                {"status": "error", "message": " ".join(errors)},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # If validation passed, set and save new password
        user.set_password(new_password)
        user.save()

        return Response(
            {"status": "success", "message": "Password reset successful"},
            status=status.HTTP_200_OK,
        )

    except (TypeError, ValueError, OverflowError, CustomUser.DoesNotExist):
        return Response(
            {"status": "error", "message": "Invalid user"},
            status=status.HTTP_400_BAD_REQUEST,
        )
