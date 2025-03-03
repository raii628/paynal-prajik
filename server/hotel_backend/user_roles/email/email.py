from django.core.mail import send_mail
from django.conf import settings
import random

def send_otp_to_email(email, message):
    try:
        otp = random.randint(100000, 999999)
        subject = f"Moonlight Hotel Register OTP"
        otp_message = f"{message} is: {otp}"
        email_from = settings.EMAIL_HOST
        send_mail(subject, otp_message, email_from, [email])
        return otp
    except Exception as e:
        print(str(e))
        return None

def send_reset_password(email):
    try:
        otp = random.randint(100000, 999999)
        subject = f"Moonlight Hotel Reset Password"
        message = f"Your OTP to reset password is: {otp}"
        email_from = settings.EMAIL_HOST
        send_mail(subject, message, email_from, [email])
        return otp
    except Exception as e:
        print(str(e))
        return None