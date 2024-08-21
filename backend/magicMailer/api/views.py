from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ApiStatus(APIView):
    '''Checks the status of the api'''
    def get(self, request):
        return Response({'success': 'The API is running perfectly'}, status=status.HTTP_200_OK)