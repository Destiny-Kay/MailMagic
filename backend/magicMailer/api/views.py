from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ApiStatus(APIView):
    '''Checks the status of the api'''
    def get(self, request):
        return Response({'success': 'The API is running perfectly'}, status=status.HTTP_200_OK)


class SignupView(APIView):
    '''Signup api endpoint'''
    def post(self, request):
        return Response({'Yeap': 'The api is running perfectly'})

# TODO: Get to understand how django authentication works under the hood
class LoginView(APIView):
    '''Login api endpoint'''
    def post(self, request):
        return Response({'YEap':'This API is working as expected in the url pateer'})

# TODO: Add all other endpoints to show
# TODO: Setup rabbitmq server and define the exchanges and senders and receivers using django celery