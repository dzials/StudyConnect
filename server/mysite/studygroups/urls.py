from django.urls import path

from . import views

urlpatterns = [
    path('create_studygroups/', views.create_studygroups, name='create_studygroups'),
    path('get_studygroups/', views.get_studygroups, name='get_studygroups'),
    path('join_studygroup/', views.join_studygroup, name='join_studygroup'),
]
