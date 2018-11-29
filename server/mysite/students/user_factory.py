from students.models import Student

import json
import hashlib

class UserFactory:
    """
    A factory used for generating new users. Valid user types are STUDENT and
    PROFESSOR.
    """
    def getUser(self, type, request):
        body = json.loads(request.body)

        email = body['email']
        password = body['password']
        rcs = body['rcs']
        password = hashlib.sha224(str.encode(password)).hexdigest()
        type = body['type']

        if type == 'STUDENT':
            return Student(email=email, password=password, rcs=rcs, type=type)
        # Future account types i.e. professor, admin, etc. can be implemented.
        else:
            return Student(email=email, password=password, rcs=rcs, type=type)
