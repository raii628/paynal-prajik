from django.utils.functional import SimpleLazyObject
from rest_framework_simplejwt.authentication import JWTAuthentication # type: ignore
from django.utils.deprecation import MiddlewareMixin
from rest_framework.request import Request
from django.http import HttpRequest

class JWTCookieAuthentication(MiddlewareMixin):
    def process_request(self, request):
        if 'admin_token' is request.COOKIES:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {request.COOKIES["admin_token"]}'
        elif 'access_token' in request.COOKIES:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {request.COOKIES["access_token"]}'
        return None