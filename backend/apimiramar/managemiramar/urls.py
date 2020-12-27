from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import renderers

from . import views

urlpatterns = [
    path('', views.api_root),
    path('users/', views.UserList.as_view(),name='user-list'),
    path('category',views.CategoryList.as_view(), name='category-list'),
    path('category/<int:pk>',views.CategoryDetail.as_view(), name='category-detail'),
    path('rooms/', views.ChambreList.as_view(), name='room-list'),
    path('rooms/<int:pk>/', views.ChambreDetail.as_view(), name='room-detail'),
    path('contactus/', views.ContactUsList.as_view(), name='contact-us'),
    path('contactus/<int:pk>/', views.ContactUsDetail.as_view(), name='contact-detail'),
    path('clients/', views.ClientList.as_view(), name='client-list'),
    path('clients/<int:pk>/', views.ClientDetail.as_view(), name='client-detail'),
    path('reservation/', views.BookingListAndCreate.as_view(), name='booking'),
    path('reservation/<int:pk>/', views.BookingDetail.as_view(), name='booking-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
