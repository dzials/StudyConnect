from django.db import migrations
from classes.models import Course, CRN
import requests
import json

def get_courses(apps, schema_editor):
    yacs_api_call = "https://yacs.cs.rpi.edu/api/v5/courses.json?show_sections&show_periods"
    res = requests.get(yacs_api_call)
    courses = res.json()['courses']
    for course in courses:
        name = course['name']
        course_id = course['id']
        # seats = section['seats']
        # seats_taken = section['seats_taken']
        # instructors = section['instructors']
        # instructors = json.dumps(instructors)
        # periods = section['periods']
        #section = json.dumps(periods)
        sections = json.dumps(course['sections'])
        c = Course(name=name, course_id=course_id, sections=sections)
        c.save()

        sections_list = course['sections']
        for section in sections_list:
            crn = section['crn']
            crn = CRN(crn=crn, name=name)
            crn.save()

class Migration(migrations.Migration):

    dependencies = [
        ('classes', '0004_auto_20181026_1538'),
    ]

    operations = [
        
    ]
