from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path


urlpatterns = [
    path('admin/', admin.site.urls),

    #  LOGIN / TOKEN
    path('api/token/', obtain_auth_token),

    #  APPS
    path('api/products/', include('products.urls')),
    path('api/users/', include('users.urls')),
    path('api/cart/', include('cart.urls')),
    path('api/orders/', include('orders.urls')),
    
]


