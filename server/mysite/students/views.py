from django.shortcuts import render
from django.http import JsonResponse
from students.models import Student

import json
import hashlib
import os
import binascii

def create_student(request):
    body = json.loads(request.body)

    email = body['email']
    password = body['password']
    rcs = body['rcs']

    password = hashlib.sha224(str.encode(password)).hexdigest()

    student = Student(email=email, password=password, rcs=rcs)
    student.save()

    res = {'res': 'OK'}
    return JsonResponse(res, safe=False)

def auth_student(request):
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
        student.save()

    res = {'match': match, 'token': token}
    return JsonResponse(res, safe=False)

def add_section(request):
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
