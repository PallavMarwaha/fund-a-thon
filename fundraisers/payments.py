import razorpay
import os
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from django.forms.models import model_to_dict
from .models import Order, Fundraiser, Donation

client = razorpay.Client(auth=(os.getenv("RAZORPAY_KEY"), os.getenv("RAZORPAY_SECRET")))


"""
THIS IS NOT MEANT TO BE USED IN ANY PRODUCTION CODEBASE.
IT IS ONLY MEANT FOR DEMONSTRATION PURPOSES DURING DEVELOPMENT FOR COLLEGE PROJECT.
"""


@api_view(["POST"])
@permission_classes([AllowAny])
def create_order(request):
    """
    *UNSAFE* FOR TESTING PURPOSE ONLY
    Creates an order for the payment.
    """
    slug = request.data.get("slug")

    if slug is None:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    fundraiser_obj = Fundraiser.objects.get(slug=slug)
    order_obj = Order.objects.create(fundraiser=fundraiser_obj, amount_paid=200)

    DATA = {
        "amount": 20000,
        "currency": "INR",
        "receipt": str(order_obj.uuid),
        "notes": {"slug": slug, "key2": "value2"},
    }

    order = client.order.create(data=DATA)
    print(order)

    return Response(order)


@api_view(["POST"])
@permission_classes([AllowAny])
def callback_success(request):
    """
    *UNSAFE* FOR TESTING PURPOSE ONLY
    For saving successful payments in the database.
    """
    order_id = request.data.get("order_id")

    order_obj = Order.objects.filter(uuid=order_id).first()

    if order_obj is None:
        return Response(status=status.HTTP_404_NOT_FOUND)

    donation_obj = Donation.objects.create(
        fundraiser=order_obj.fundraiser,
        amount_paid=order_obj.amount_paid,
        payment_status=1,
        payment_info=request.data,
    )

    return Response()


# TODO: Try webhook for capturing payments.
@api_view(["POST"])
@permission_classes([AllowAny])
def webhook(request):
    """
    *UNSAFE* FOR TESTING PURPOSE ONLY
    Razorpay hook for storing payment details.
    """
    return Response()
