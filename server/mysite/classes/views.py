from django.shortcuts import render
from django.http import JsonResponse

from classes.models import Course
import json


def index(request):
    """
    Fetch the names of all the courses from Mongo.
    """
    # SELECT name,CRN FROM Course
    courses = Course.objects.all().values('name')
    # Convert the QuerySet to a list object
    courses_list = list(courses)
    print(courses_list)
    return JsonResponse(courses_list, safe=False)


def get_sections(request):
    """
    Fetch all the sections for the given course from Mongo.
    """
    body = json.loads(request.body)

    course_name = body['course_name']

    try:
        course = Course.objects.get(name=course_name)
        res = json.loads(course.sections)
    except:
        res = {'error': 'No sections found.'}

    return JsonResponse(res, safe=False)
