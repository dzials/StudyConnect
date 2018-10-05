from django.db import models
import json

class Section(models.Model):
    name = models.CharField(max_length=200)
    crn = models.IntegerField()
    course_id = models.IntegerField()
    seats = models.IntegerField()
    seats_taken = models.IntegerField()
    instructors = models.CharField(max_length=500)
    periods = models.CharField(max_length=1000)
