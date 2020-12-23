from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import renderers

from . import views

urlpatterns = [
    path('', views.api_root),
    path('category',views.CategoryList.as_view(), name='category-list'),
    path('rooms/', views.ChambreList.as_view(), name='room-list'),
    path('rooms/<int:pk>/', views.ChambreDetail.as_view(), name='room_detail'),
    path('users/', views.UserList.as_view(),name='user-list'),

]

urlpatterns = format_suffix_patterns(urlpatterns)
