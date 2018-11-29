from django.urls import path

from . import views

urlpatterns = [
    path('create_user/', views.create_user, name='create_user'),
    path('auth_student/', views.auth_student, name='auth_student'),
    path('add_section/', views.add_section, name='add_section'),
    path('leave_section/', views.leave_section, name='leave_section'),
    path('get_user_courses/', views.get_user_courses, name='get_user_courses'),
]
