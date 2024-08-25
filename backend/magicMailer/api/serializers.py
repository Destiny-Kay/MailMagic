from rest_framework.serializers import ModelSerializer, CharField
from api.models import CustomUser, Contact, ContactGroup


class UserSerializer(ModelSerializer):
    '''A serializer object for the custom user object'''
    class Meta:
        model = CustomUser
        fields = ["first_name", "last_name", "email", "date_created", "password"]
        extra_kwargs = {
            "password" : {
                "write_only": True
            }
        }

    def __init__(self, *args, **kwargs):
        super(UserSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method in ['GET']:
            self.fields['id'] = CharField()
 
    def create(self, validated_data):
        password = validated_data.pop("password")
        userInstance = self.Meta.model(**validated_data)
        if password is not None:
            userInstance.set_password(password)
        userInstance.save()
        return userInstance


class ContactSerializer(ModelSerializer):
    '''Serializer object for the contact model'''
    class Meta:
        model = Contact
        fields = "__all__"


class ContactGroupSerializer(ModelSerializer):
    '''serializer class for the contact groups model'''
    class Meta:
        model = ContactGroup
        fields = "__all__"
