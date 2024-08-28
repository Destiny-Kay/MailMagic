from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from api.serializers import UserSerializer, ContactSerializer, ContactGroupSerializer, GroupContactItemsSerializer, EmailAccountSerializer
from api.models import CustomUser, Contact, ContactGroup, EmailAccount
from django.shortcuts import get_object_or_404
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.pagination import PageNumberPagination
from api.tasks import mail_send_emails


class Pagination(PageNumberPagination):
    '''Pagination class for the apis'''
    page_size = 30
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = 100

class ApiStatus(APIView):
    '''Checks the status of the api'''
    def get(self, request):
        return Response({'success': 'The API is running perfectly'}, status=status.HTTP_200_OK)


class SignupView(APIView):
    '''Signup api endpoint'''
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]
    def post(self, request):
        if not request.data:
            return Response({'error': 'no data was provided'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserView(APIView):
    '''Request handler for the user model'''
    permission_classes = [AllowAny]
    def get(self, request):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True, context = {'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, user_id):
        '''deletes a user'''
        user = get_object_or_404(CustomUser, id=user_id)
        user.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)


class LoginView(APIView):
    '''Login api endpoint'''
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]
    def post(self, request):
        if not request.data:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user_email = request.data['email']
            password = request.data['password']
        except KeyError:
            return Response({'error': 'password and email required'},status=status.HTTP_400_BAD_REQUEST)
        user = get_object_or_404(CustomUser, email=user_email)
        if not user.check_password(password):
            raise AuthenticationFailed('incorrect password')
        refresh_token = RefreshToken.for_user(user)
        return Response({'access': str(refresh_token.access_token), 'refresh': str(refresh_token)}, status=status.HTTP_200_OK)


class ContactsView(APIView):
    '''Handles contact CRUD OPS'''
    permission_classes = [IsAuthenticated]
    def post(self, request):
        '''Handles post requests for the contact model'''
        if not request.data:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            name = request.data['name']
            email = request.data['email']
        except KeyError:
            return Response({'error': 'provide name and email data'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            existing_contact = Contact.objects.get(email=email, created_by=request.user.id)
            return Response({'error': 'contact with that email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        except Contact.DoesNotExist:
            serializer = ContactSerializer(data={"name": name, "email": email, "created_by": request.user.id})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, contact_id=None):
        '''Modififes a contact model object'''
        if not contact_id or not request.data:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        contact = get_object_or_404(Contact, id=contact_id)
        serializer = ContactSerializer(contact, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def get(self, request, contact_id=None):
        '''Handles get requests for the contacts api endpoint'''
        pagintaion_class = Pagination()
        if contact_id:
            user = get_object_or_404(CustomUser, id=contact_id)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        user = request.user
        contacts = Contact.objects.filter(created_by=user.id).order_by('name')
        results_page = pagintaion_class.paginate_queryset(contacts, request)
        serializer = ContactSerializer(results_page, many=True)
        payload = {
            'count': pagintaion_class.page.paginator.count,
            'pages': pagintaion_class.page.paginator.num_pages,
            'data': serializer.data
        }
        return Response(payload, status=status.HTTP_200_OK)

    def delete(self, reqest, contact_id=None):
        '''Handles delete op on contact'''
        if not contact_id:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        contact = get_object_or_404(Contact, id=contact_id)
        contact.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

class ContactGroupsView(APIView):
    '''Handles CRUD ops for contact groups'''
    permission_classes = [IsAuthenticated]
    def get(self, request, contact_group_id=None):
        '''handles get requests for contact groups'''
        pagination_class = Pagination()
        if contact_group_id:
            contact_group = get_object_or_404(ContactGroup, id=contact_group_id)
            serializer = ContactGroupSerializer(contact_group)
            return Response(serializer.data, status=status.HTTP_200_OK)
        contact_groups = ContactGroup.objects.filter(creator=request.user.id).order_by('name')
        results = pagination_class.paginate_queryset(contact_groups, request)
        serializer = ContactGroupSerializer(results, many=True)
        payload = {
            'count': pagination_class.page.paginator.count,
            'pages': pagination_class.page.paginator.num_pages,
            'data': serializer.data
        }
        return Response(payload, status=status.HTTP_200_OK)

    def post(self, request):
        '''Handles post request for the contactgroups'''
        if not request.data:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        contact_ids = request.data.get('contacts', [])
        data = {
            "name": request.data.get('name'),
            "description":request.data.get('description'),
            "creator": request.user.id
        }

        serializer = ContactGroupSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        contact_group = serializer.save()
        if contact_ids:
            contacts =  Contact.objects.filter(id__in=contact_ids)
            if contacts.exists():
                contact_group.contacts.add(*contacts)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, contact_group_id=None):
        '''handles put rquests'''
        if not request.data or not contact_group_id:
            return Response({'error': 'bad equest'}, status=status.HTTP_400_BAD_REQUEST)
        contact_group = get_object_or_404(ContactGroup, id=contact_group_id)
        serializer = ContactGroupSerializer(contact_group, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, contact_group_id=None):
        '''Handles deletion of a group'''
        if not contact_group_id:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        contact_group = get_object_or_404(ContactGroup, id=contact_group_id)
        contact_group.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

class GetContactGroupItemView(APIView):
    '''Returns the contacts in a particular group'''
    permission_classes = [IsAuthenticated]
    def get(self, request, contact_group_id=None):
        if not contact_group_id:
            return Response({'error': 'bad request'})
        contact_group = get_object_or_404(ContactGroup, id=contact_group_id)
        serializer = GroupContactItemsSerializer(contact_group)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddContactGroupItemView(APIView):
    '''Manages individual contacts in a group '''
    def post(self, request, contact_group_id=None):
        '''Adds a nw contact to a group'''
        if not request.data or not contact_group_id:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        contact_group = get_object_or_404(ContactGroup, id=contact_group_id)
        contact_ids = request.data.get('contacts', [])
        if not isinstance(contact_ids, list):
            return Response({'error': 'contacts should be a list of IDs.'}, status=status.HTTP_400_BAD_REQUEST)
        contacts = Contact.objects.filter(id__in=contact_ids)
        contact_group.contacts.add(*contacts)
        return Response({"message": "contacts added successfully."}, status=status.HTTP_200_OK)

class DeleteContactGroupItemView(APIView):
    '''Deletes a contact from a contact group'''
    def delete(self, request, contact_group_id=None, contact_id=None):
        if not contact_group_id or not contact_id:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        contact_group = get_object_or_404(ContactGroup, id=contact_group_id)
        contact = get_object_or_404(Contact, id=contact_id)
        contact_group.contacts.remove(contact)
        return Response({'message': 'contacts removed successfully'}, status=status.HTTP_200_OK)


class EmailAccountView(APIView):
    '''Accounts for email addresses to be used to send emails'''
    permission_classes = [IsAuthenticated]
    def get(self, request, emailaccount_id=None):
        email_owner = request.user
        if emailaccount_id:
            email_account = EmailAccount.objects.get(id=emailaccount_id)
            serializer = EmailAccountSerializer(email_account)
            return Response(serializer.data, status=status.HTTP_200_OK)
        email_accounts = EmailAccount.objects.filter(owner=request.user.id)
        serializer = EmailAccountSerializer(email_accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        '''post request handler'''
        if not request.data:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        payload = {
            "name": request.data['name'],
            "owner": request.user.id,
            "email_address": request.data['email'],
            "password": request.data['password']
        }
        serializer = EmailAccountSerializer(data=payload)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def put(self, request, emailaccount_id=None):
        '''make changes to an email account'''
        if not emailaccount_id or not request.data:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        email_account = get_object_or_404(EmailAccount, id=emailaccount_id)
        serializer = EmailAccountSerializer(email_account, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, emailaccount_id=None):
        '''Deletes an email account'''
        if not emailaccount_id:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        email_account = get_object_or_404(EmailAccount, id=emailaccount_id)
        email_account.delete()
        return Response({}, status=status.HTTP_204_NO_CONTENT)

class SendEMailsView(APIView):
    '''sends mass emails to selected users'''
    permission_classes = [IsAuthenticated]
    def post(self, request):
        '''HAndles sending of emails'''
        if not request.data:
            return Response({'error': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
        user = request.user
        sender_email = request.data['sender_email']
        recipients = request.data['recipients']
        salutation = request.data['recipients']
        body = request.data['message']
        subject = request.data['subject']
        mail_send_emails.delay(user, sender_email, recipients, salutation, body, subject)
        return Response({"success": "email sending started"}, status=status.HTTP_200_OK)
