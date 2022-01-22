from codecs import StreamWriter
from django.db import models


class Adress(models.Model):
    firstname = models.CharField(max_length=100, )
    lastname = models.CharField(max_length=100)
    middleName = models.CharField(max_length=100, null=True, blank=True)
    iin = models.CharField(max_length=12)
    city = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    home = models.CharField(max_length=100, null=True, blank=True)
    homeNumber = models.CharField(max_length=100, null=True, blank=True)
    cadNumber = models.CharField(max_length=100, null=True, blank=True)
    area = models.CharField(max_length=100, null=True, blank=True)
    info = models.CharField(max_length=500, null=True, blank=True)
    lat = models.CharField(max_length=30, null=True)
    lng = models.CharField(max_length=30, null=True)
