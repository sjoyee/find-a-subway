from rest_framework import serializers
from outlets.models import Outlet


"""
Inheriting the ModelSerializer class will:
- Automatically generate a set of fields and validators for the serializer
- Create default implementations of .create() and .update()
"""


class OutletsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outlet
        fields = '__all__'
