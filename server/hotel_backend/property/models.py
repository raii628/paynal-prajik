from django.db import models

# Create your models here.
class RoomTypes(models.Model):
    name = models.CharField(max_length=100, unique=True, null=False)
    description = models.TextField(blank=True)
    base_price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    capacity = models.IntegerField()

class Amenities(models.Model):
    name = models.CharField(max_length=100, unique=True, null=False)
    description = models.TextField(blank=True)

class RoomTypeAmenities(models.Model):
    room_type = models.ForeignKey(RoomTypes, on_delete=models.CASCADE)
    amenity = models.ForeignKey(Amenities, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('room_type', 'amenity')

class Rooms(models.Model):
    ROOM_STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
        ('maintenance', 'Maintenance'),
    ]
    
    room_number = models.CharField(max_length=10, unique=True, null=False)
    room_type = models.ForeignKey(RoomTypes, on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=ROOM_STATUS_CHOICES,
        default='available',
    )
    notes = models.TextField(blank=True)

class Areas(models.Model):
    AREA_STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
        ('maintenance', 'Maintenance'),
    ]
    
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    capacity = models.IntegerField()
    price_per_hour = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    status = models.CharField(
        max_length=20,
        choices=AREA_STATUS_CHOICES,
        default='available',
    )