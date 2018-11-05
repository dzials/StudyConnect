from students.models import Student

import json
import hashlib

class UserFactory:
    def getUser(self, type, request):
        body = json.loads(request.body)

        email = body['email']
        password = body['password']
        rcs = body['rcs']
        password = hashlib.sha224(str.encode(password)).hexdigest()

        if type == 'STUDENT':
            return Student(email=email, password=password, rcs=rcs)
        # Future account types i.e. professor, admin, etc. can be implemented.
        else:
            return Student(email=email, password=password, rcs=rcs)
