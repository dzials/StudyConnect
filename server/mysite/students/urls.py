from django.urls import path

from . import views

urlpatterns = [
    path('create_student/', views.create_student, name='create_student'),
    path('auth_student/', views.auth_student, name='auth_student'),
    path('add_section/', views.add_section, name='add_section'),
]
