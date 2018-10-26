from django.shortcuts import render
from django.http import JsonResponse

from classes.models import Course

def index(request):
    # SELECT name FROM Course
    courses = Course.objects.all().values('name')
    # Convert the QuerySet to a list object
    courses_list = list(courses)
    print(courses_list)
    return JsonResponse(courses_list, safe=False)
