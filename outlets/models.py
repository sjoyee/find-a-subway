from django.db import models

# Create your models here.
class Outlets(models.Model):
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    operating_hour = models.CharField(max_length=255)
    waze_link = models.CharField(max_length=500)
    longitude = models.FloatField()
    latitude = models.FloatField()