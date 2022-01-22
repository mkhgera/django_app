import imp
from django.urls import path
from . views import AdressList, AdressDetail, AdressCreate, AdressUpdate, DeleteView
from . import views

urlpatterns = [
    path('', AdressList.as_view(), name='adresses'),
    path('adress/<int:pk>/', AdressDetail.as_view(), name='adress'),
    path('adress-create/', AdressCreate.as_view(), name='adress-create'),
    path('adress-update/<int:pk>/', AdressUpdate.as_view(), name='adress-update'),
    path('adress-delete/<int:pk>/', DeleteView.as_view(), name='adress-delete'),
]
