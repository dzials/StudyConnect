# StudyConnect

StudyConnect is an app that allows RPI students to find study sessions for their classes.

## Getting Started
To get StudyConnect setup on your machine, ensure you have the following installed:
1. pip
2. docker and docker-compose
3. virtualenv (python virtual environment)

Next, we will cover how to get a development environment started:
1. `cd` into the server directory
2. Run `virtualenv venv`
3. Run `source ./venv/bin/activate`
4. Run `pip install -r requirements.txt`
5. Run `docker-compose up -d`. You can now access the MongoDB running via `localhost:8081` through your web browser
6. If the `studyconnect` database does not contain a `classes_section` collection, then run `python manage.py migrate`
7. To run the actual dev server, run: `python manage.py runserver`
8. All done!

To run the website:
1. `cd` into the client directory
2. Run `npm start`

2b. If this returns an error, it is likely you do not have the dependencies installed.  The solution to this is to run `npm install` which should install any dependencies and allow you to run the website.
