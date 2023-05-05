import functools
from rest_framework.response import Response
from rest_framework import status


def is_student_required(func):
    """
    Decorator that checks if the user is a student.
    Returns HTTP 403 if not authenticated or not a student.
    """

    @functools.wraps(func)
    def decorator(request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(
                {"detail": "Not authenticated"}, status=status.HTTP_403_FORBIDDEN
            )

        if not request.user.is_student:
            return Response(
                {"detail": "Not authorized"}, status=status.HTTP_403_FORBIDDEN
            )
        return func(request, *args, **kwargs)

    return decorator
