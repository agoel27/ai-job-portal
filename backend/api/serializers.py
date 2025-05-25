from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "email", "password", "verified", "is_staff"]
        extra_kwargs = {
            "password": {"write_only": True},
            "verified": {"read_only": True},
            "is_staff": {"read_only": True},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to token
        token["is_staff"] = user.is_staff
        token["email"] = user.email
        return token
