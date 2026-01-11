# orders/views.py

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from cart.models import Cart
from .models import Order, OrderItem

from .models import Order
from .serializers import OrderSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def place_order(request):
    user = request.user

    try:
        cart = Cart.objects.get(user=user)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=400)

    cart_items = cart.cartitem_set.all()

    if cart_items.count() == 0:
        return Response({"error": "Cart is empty"}, status=400)

    total_price = 0
    for item in cart_items:
        total_price += item.product.price * item.quantity

    order = Order.objects.create(
        user=user,
        total_price=total_price
    )

    for item in cart_items:
        OrderItem.objects.create(
            order=order,
            product=item.product,
            quantity=item.quantity,
            price=item.product.price
        )

    # clear cart
    cart_items.delete()

    return Response({
        "message": "Order placed successfully",
        "order_id": order.id,
        "total_price": total_price
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_orders(request):
    orders = Order.objects.filter(user=request.user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)
