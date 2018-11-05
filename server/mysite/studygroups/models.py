from django.db import models
import json

class Studygroup(models.Model):
    number = models.CharField(max_length=200)
    course_name = models.CharField(max_length=200)
    time = models.CharField(max_length=200)
    day = models.CharField(max_length=200)
    participants = models.CharField(max_length=200)
