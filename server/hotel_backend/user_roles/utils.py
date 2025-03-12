from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    
    # Add role claim to tokens
    refresh['role'] = 'admin' if user.is_staff else 'guest'
    
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token)
    }