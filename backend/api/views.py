from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

@api_view(["POST"])
@permission_classes([AllowAny])
def google_auth(request):
    token = request.data.get("credential")
    if not token:
        return Response({"error": "Token is required"}, status=400)

    try:
        payload = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_OAUTH_CLIENT_ID)
        if payload["aud"] != settings.GOOGLE_OAUTH_CLIENT_ID:
            return Response({"error": "Invalid Client ID"}, status=400)

        email = payload.get("email")
        name = payload.get("name")

        print(email)
        print(name)

        user, created = User.objects.get_or_create(email=email, defaults={"username": name})
        
        refresh = RefreshToken.for_user(user)

        return Response({
            "email": str(email),
            "name": str(name),
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })
    except ValueError:
        return Response({"error": "Invalid token"}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=400)


from rest_framework import generics
from .models import CustomUser
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]



from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from .models import CustomUser
from .utils.emails import send_email_via_gmail

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


from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str

@api_view(["GET"])
@permission_classes([AllowAny])
def verify_email(request, uidb64, token):
    try:
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = CustomUser.objects.get(pk=uid)

        print(f"UID: {uid}, Token: {token}")  # Debugging
        print(f"User: {user.email}, Verified: {user.verified}")  # Debugging

        if default_token_generator.check_token(user, token):
            user.verified = True
            user.save()
            print(f"User {user.email} verified successfully.")  # Debugging
            return JsonResponse({"status": "success", "message": "Email verified"})
        else:
            print("Invalid token")  # Debugging
            return JsonResponse({"status": "error", "message": "Invalid token"}, status=400)

    except CustomUser.DoesNotExist:
        print("User not found")  # Debugging
        return JsonResponse({"status": "error", "message": "User not found"}, status=400)
    except Exception as e:
        print(f"Error: {e}")  # Debugging
        return JsonResponse({"status": "error", "message": str(e)}, status=400)


from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework import status

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        user_email = request.data.get("email")
        user = CustomUser.objects.filter(email=user_email).first()
        
        if user and not user.verified:
            return Response({"error": "Email not verified"}, status=status.HTTP_403_FORBIDDEN)
        
        return response