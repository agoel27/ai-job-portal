from django.core.mail import send_mail
from django.conf import settings


def send_email_via_gmail(subject, message, recipient_email):
    try:
        send_mail(
            subject,
            message,
            settings.EMAIL_HOST_USER,
            [recipient_email],
            fail_silently=False,
        )
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
