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
    token = request.data.get("credential")  # Fix key name
    if not token:
        return Response({"error": "Token is required"}, status=400)

    try:
        # Verify Google token
        payload = id_token.verify_oauth2_token(token, requests.Request(), settings.GOOGLE_OAUTH_CLIENT_ID)
        if payload["aud"] != settings.GOOGLE_OAUTH_CLIENT_ID:
            return Response({"error": "Invalid Client ID"}, status=400)

        email = payload.get("email")
        name = payload.get("name")

        print(email)
        print(name)

        # Find or create user
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


# api/views.py
from rest_framework import generics
from django.contrib.auth.models import User
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# class NoteListCreate(generics.ListCreateAPIView):
#     serializer_class = NoteSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Note.objects.filter(author=user)

#     def perform_create(self, serializer):
#         if serializer.is_valid():
#             serializer.save(author=self.request.user)
#         else:
#             print(serializer.errors)
#         return super().perform_create(serializer)

# class NoteDelete(generics.DestroyAPIView):
#     serializer_class = NoteSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         return Note.objects.filter(author=user)