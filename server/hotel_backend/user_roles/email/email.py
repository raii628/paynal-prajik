<<<<<<< HEAD
from django.core.mail import send_mail, EmailMultiAlternatives
from django.conf import settings
=======
from django.core.mail import EmailMultiAlternatives
>>>>>>> upstream/main
import random, os
from dotenv import load_dotenv

load_dotenv()

def send_otp_to_email(email, message):
    try:
        otp = random.randint(100000, 999999)
        subject = f"Azurea Hotel OTP for Account Verification"
        otp_message = f"""
        <!DOCTYPE html>
        <html lang="en">
            <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Account Verification OTP</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
    </head>
    <body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
    <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff; background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner); background-repeat: no-repeat; background-size: 800px 452px; background-position: top center; font-size: 14px; color: #434343;">
        <main>
        <div style="margin: 0; margin-top: 70px; padding: 92px 30px 115px; background: #ffffff; border-radius: 30px; text-align: center;">
            <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 500; color: #1f1f1f;">Your OTP for Account Verification</h1>
            <p style="margin: 0; margin-top: 17px; font-size: 16px; font-weight: 500;">Hey {email},</p>
            <p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
                Thank you for choosing Azurea Hotel Management. Use the following OTP to complete the procedure to change your email address. OTP is valid for 
                <span style="font-weight: 600; color: #1f1f1f;">2 minutes</span>. Do not share this code with others.
            </p>
            <p style="margin: 0; margin-top: 60px; font-size: 40px; font-weight: 600; letter-spacing: 25px; color: #ba3d4f;">{otp}</p>
            </div>
        </div>
        </main>
    </div>
    </body>
</html>
"""
        email_from = os.getenv('EMAIL_HOST_USER')
        msg = EmailMultiAlternatives(subject, message, email_from, [email])
        msg.attach_alternative(otp_message, "text/html")
        msg.send()
        
        return otp
    except Exception as e:
        print(str(e))
        return None

def send_reset_password(email):
    try:
        otp = random.randint(100000, 999999)
        subject = f"Azurea Hotel Reset Password"
        message = f"""
        <!DOCTYPE html>
        <html lang="en">
            <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Reset Password OTP</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
    </head>
    <body style="margin: 0; font-family: 'Poppins', sans-serif; background: #ffffff; font-size: 14px;">
    <div style="max-width: 680px; margin: 0 auto; padding: 45px 30px 60px; background: #f4f7ff; background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner); background-repeat: no-repeat; background-size: 800px 452px; background-position: top center; font-size: 14px; color: #434343;">
        <main>
        <div style="margin: 0; margin-top: 70px; padding: 92px 30px 115px; background: #ffffff; border-radius: 30px; text-align: center;">
            <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 500; color: #1f1f1f;">Your OTP for Reset Password</h1>
            <p style="margin: 0; margin-top: 17px; font-size: 16px; font-weight: 500;">Hey {email},</p>
            <p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
                Thank you for choosing Azurea Hotel Management. Use the following Reset Password OTP to complete the procedure to reset your password. The Reset Password OTP is valid for 
                <span style="font-weight: 600; color: #1f1f1f;">2 minutes</span>. Do not share this code with others.
            </p>
            <p style="margin: 0; margin-top: 60px; font-size: 40px; font-weight: 600; letter-spacing: 25px; color: #ba3d4f;">{otp}</p>
            </div>
        </div>
        </main>
    </div>
    </body>
</html>
"""
        email_from = os.getenv('EMAIL_HOST_USER')
        msg = EmailMultiAlternatives(subject, message, email_from, [email])
<<<<<<< HEAD
=======
        msg.attach_alternative(message, "text/html")
>>>>>>> upstream/main
        msg.send()
        
        return otp
    except Exception as e:
        print(f"Error: {str(e)}")
        return None
