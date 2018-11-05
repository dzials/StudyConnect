from django.shortcuts import render
from django.http import JsonResponse
from django.core import serializers

from students.models import Student
from classes.models import Course, CRN
from studygroups.models import Studygroup

import json

def gen_bounds():
    bounds = {}
    for i in range(1, 6):
        init_bounds = []
        # Initial off-limits bounds will be 12AM-9AM and 9PM-12AM
        init_bounds.append( (0000, 900) )
        init_bounds.append( (2100, 2400) )
        bounds[str(i)] = init_bounds

    return bounds

def create_studygroups(request):
    all_students = Student.objects.all()

    class_set = set()
    for student in all_students:
        classes = json.loads(student.classes)

        for crn in classes['crns']:
            match = CRN.objects.get(crn=crn)
            class_set.add(match.name)

    group_id = 0

    # Now have a list of all classes we need study groups for
    for course_name in class_set:
        match = Course.objects.get(name=course_name)

        bounds = gen_bounds()

        sections = json.loads(match.sections)
        for section in sections:
            periods = section['periods']
            for period in periods:
                day = str(period['day'])
                bound = (int(period['start']), int(period['end']))
                bounds[day].append(bound)

        # Now have all bounds that we are not allowed to schedule study groups in
        for day in range(1, 6):
            for time in range(0000, 2500, 100):
                valid = True
                for bound in bounds[str(day)]:
                    if time >= bound[0] and time <= bound[1]:
                        valid = False
                        break
                # This time doesn't violate any off-limits bounds, so make a session.
                if valid:
                    participants = []
                    participants = json.dumps(participants)
                    session = Studygroup(number=group_id, course_name=course_name, time=time, participants=participants, day=day)
                    session.save()
                    group_id = group_id + 1

    res = {'res': 'OK'}
    return JsonResponse(res, safe=False)

def get_studygroups(request):
    body = json.loads(request.body)
    course_name = body['course_name']

    res = Studygroup.objects.filter(course_name=course_name)
    res = serializers.serialize("json", res)
    return JsonResponse(res, safe=False)

def join_studygroup(request):
    body = json.loads(request.body)

    group_id = body['group_id']
    token = body['token']

    rcs = Student.objects.get(token=token).rcs
    group = Studygroup.objects.get(id=group_id)
    participants = json.loads(group.participants)
    participants.append(rcs)
    group.participants = json.dumps(participants)
    group.save()

    res = {'res': 'OK'}
    return JsonResponse(res, safe=False)

def get_user_groups(request):
    body = json.loads(request.body)
    token = body['token']

    rcs = Student.objects.get(token=token).rcs
    all_groups = Studygroup.objects.all()

    res = []
    for group in all_groups:
        participants = json.loads(group.participants)
        if rcs in participants:
            res.append( serializers.serialize("json", [group]) )

    res = {'groups': res}
    print(res)
    return JsonResponse(res, safe=False)
