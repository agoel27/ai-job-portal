from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
        return super().perform_create(serializer)
    
class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework.decorators import api_view
from google.auth.transport import requests
from google.oauth2 import id_token
from rest_framework_simplejwt.tokens import RefreshToken
import os

User = get_user_model()

GOOGLE_CLIENT_ID = "271538677494-dh30ken1chq02g80b6ri8jh4jke0q0bt.apps.googleusercontent.com"


@api_view(["POST"])
def google_auth(request):
    token = request.data.get("token")
    try:
        # Verify token with Google
        payload = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        email = payload.get("email")
        name = payload.get("name")

        # Get or create user
        user, _ = User.objects.get_or_create(email=email, defaults={"username": name})
        refresh = RefreshToken.for_user(user)

        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
        })
    except Exception as e:
        return Response({"error": str(e)}, status=400)
