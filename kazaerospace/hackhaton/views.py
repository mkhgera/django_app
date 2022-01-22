from ast import Delete
from email import contentmanager
from django.http import HttpResponse
from django.shortcuts import render
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from . models import Adress
from django.urls import reverse_lazy
# Create your views here.


class AdressList(ListView):
    model = Adress
    context_object_name = 'adresses' 

class AdressDetail(DetailView):
    model = Adress
    context_object_name = 'adress'

class AdressCreate(CreateView):
    model = Adress
    fields = '__all__'
    success_url = reverse_lazy('adresses')


class AdressUpdate(UpdateView):
    model = Adress
    fields = '__all__'
    success_url = reverse_lazy('adresses')

class DeleteView(DeleteView):
    model = Adress 
    context_object_name = 'adress'
    success_url = "/"




