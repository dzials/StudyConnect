from django.db import models
import json

class Student(models.Model):
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
    rcs = models.CharField(max_length=200)
    token = models.CharField(max_length=200)
    classes = models.CharField(max_length=2000, default='')
    type = models.CharField(max_length=200)
