from django.urls import path
from .views import my_orders, place_order

urlpatterns = [
    path('place/', place_order),
    path('', my_orders),
]
