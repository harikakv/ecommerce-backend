
from django.urls import path
from .views import view_cart, add_to_cart, remove_from_cart, update_cart_item

urlpatterns = [
    path('', view_cart),
    path('add/', add_to_cart),
    path('remove/<int:item_id>/', remove_from_cart),
    path('update/<int:item_id>/', update_cart_item),
]