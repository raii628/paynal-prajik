from django.shortcuts import render
from .models import AdminDetails
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

# Create your views here.
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_admin_details(request):
    try:
        admin_details = AdminDetails.objects.get(email="admin@gmail.com")
    except AdminDetails.DoesNotExist:
        return Response({"error": "Admin not found"}, status=status.HTTP_404_NOT_FOUND)
    
    data = {
        "name": admin_details.name,
        "email": admin_details.email,
        "profile_pic": admin_details.profile_pic.url if admin_details.profile_pic else None
    }
    
    return Response({
        'data': data
    }, status=status.HTTP_200_OK)