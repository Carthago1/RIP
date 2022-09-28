from django.shortcuts import render
from store.models import Categories
from store.models import Items
from django.http import HttpResponse


def main(request):
    return render(request, 'index.html', {'data': {
        'categories': Categories.objects.all()
    }})


def get_category(request, id):
    return render(request, 'category.html', {'data': {
        'category': Categories.objects.filter(id_category=id)[0],
        'items': Items.objects.filter(id_category=id),
    }})
