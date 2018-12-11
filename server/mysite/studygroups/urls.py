from django.urls import path

from . import views

urlpatterns = [
    path('create_studygroups/', views.create_studygroups,
         name='create_studygroups'),
    path('create_studygroup/', views.create_studygroup,
         name='create_studygroup'),
    path('delete_studygroups/', views.delete_studygroups,
         name='delete_studygroups'),
    path('get_studygroups/', views.get_studygroups, name='get_studygroups'),
    path('join_studygroup/', views.join_studygroup, name='join_studygroup'),
    path('leave_studygroup/', views.leave_studygroup, name='leave_studygroup'),
    path('get_user_groups/', views.get_user_groups, name='get_user_groups'),
]
