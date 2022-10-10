from django.shortcuts import render
#from store.models import Categories, Items
from rest_framework import viewsets
from store.serializers import *


class CategoriesViewSet(viewsets.ModelViewSet):
    queryset = Categories.objects.all()
    serializer_class = CategoriesSerializer


class ItemsViewSet(viewsets.ModelViewSet):
    queryset = Items.objects.all()
    serializer_class = ItemsSerializer


class OrdersViewSet(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrdersSerializer


def main(request):
    return render(request, 'index.html', {'data': {
        'categories': Categories.objects.all()
    }})


def get_category(request, id):
    return render(request, 'category.html', {'data': {
        'category': Categories.objects.filter(id_category=id)[0],
        'items': Items.objects.filter(id_category=id),
    }})
