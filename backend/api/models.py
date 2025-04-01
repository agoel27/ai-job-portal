from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
    Group,
    Permission,
)
from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_("The Email field must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(
        unique=True,
        validators=[
            RegexValidator(
                regex=r"(^[\w\.-]+@[\w\.-]+\.\w{2,4}$)", message="Invalid email format"
            )
        ],
    )

    password = models.CharField(
        max_length=128,
        validators=[
            MinLengthValidator(
                6, message="Password must be at least 6 characters long."
            ),
            RegexValidator(
                regex=r".*[A-Za-z].*",
                message="Password must contain at least one letter.",
            ),
            RegexValidator(
                regex=r".*\d.*", message="Password must contain at least one number."
            ),
            RegexValidator(
                regex=r".*[@$!%%*?&].*",
                message="Password must contain at least one special character (@$!%%*?&).",
            ),
        ],
    )

    verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    groups = models.ManyToManyField(Group, related_name="customuser_set", blank=True)
    user_permissions = models.ManyToManyField(
        Permission, related_name="customuser_permissions", blank=True
    )

    objects = CustomUserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
