from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_sections/', views.get_sections, name='get_sections')
]
