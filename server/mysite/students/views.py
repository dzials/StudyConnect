from django.shortcuts import render
from django.http import JsonResponse
from students.models import Student
from classes.models import CRN

from .user_factory import UserFactory

import json
import hashlib
import os
import binascii


def create_user(request):
    """
    Create a new user account, whether it be STUDENT or PROFESSOR.
    The actual object creation is handled by the UserFactory.
    """
    body = json.loads(request.body)

    factory = UserFactory()
    student = factory.getUser('STUDENT', request)
    student.save()

    res = {'res': 'OK'}
    return JsonResponse(res, safe=False)


def auth_student(request):
    """
    For use when a student logs into the system.
    Authenticate the student and provide a token.
    """
    body = json.loads(request.body)

    email = body['email']
    password = body['password']
    password = hashlib.sha224(str.encode(password)).hexdigest()

    match = Student.objects.filter(email=email, password=password)

    # No matches found; do not log user in
    if match.count() == 0:
        match = False
        token = ''
    # Found a user; log them in
    else:
        match = True
        token = binascii.b2a_hex(os.urandom(15))
        token = token.decode()
        student = Student.objects.get(email=email, password=password)
        student.token = token
        type = student.type
        student.save()

    res = {'match': match, 'token': token, 'type': type}
    return JsonResponse(res, safe=False)


def add_section(request):
    """
    Add a course's section to a user's list of courses that they are taking.
    """
    body = json.loads(request.body)

    crn = body['crn']
    token = body['token']

    match = Student.objects.get(token=token)

    # No dict defined yet
    if match.classes == '':
        match_classes = {}
        match_classes['crns'] = []
    # Load sections from storage
    else:
        match_classes = json.loads(match.classes)

    match_classes['crns'].append(crn)

    # Convert back to string for storage
    match.classes = json.dumps(match_classes)
    match.save()

    res = {'res': 'OK', 'crns': match_classes}
    return JsonResponse(res, safe=False)


def leave_section(request):
    """
    Remove a course's section to a user's list of courses that they are taking.
    """
    body = json.loads(request.body)
    crn = body['crn']
    token = body['token']

    match = Student.objects.get(token=token)

    # Remove a section based on storage
    if match.classes != '':
        match_classes = json.loads(match.classes)
        crn_list = match_classes['crns']
        crn_list.remove(crn)
        match_classes['crns'] = crn_list
        match.classes = json.dumps(match_classes)
        match.save()
    # No dict defined yet
    else:
        match_classes = {}
        match_classes['crns'] = []
        match.classes = match_classes

    res = {'res': 'OK', 'crns': match_classes}
    return JsonResponse(res, safe=False)


def get_user_courses(request):
    """
    Retrieve the list of courses that a student is taking
    """
    body = json.loads(request.body)
    token = body['token']

    res = []
    classes = Student.objects.get(token=token).classes
    classes = json.loads(classes)
    crns = classes['crns']
    for crn in crns:
        name = CRN.objects.get(crn=crn).name
        obj = {'crn': crn, 'course_name': name}
        res.append(obj)

    res = json.dumps(res)
    return JsonResponse(res, safe=False)
