from django.db import models
import json

class Course(models.Model):
    name = models.CharField(max_length=200)
    course_id = models.CharField(max_length=200)
    sections = models.CharField(max_length=50000)
    # crn = models.IntegerField()
    # course_id = models.IntegerField()
    # seats = models.IntegerField()
    # seats_taken = models.IntegerField()
    # instructors = models.CharField(max_length=500)
    # periods = models.CharField(max_length=1000)
