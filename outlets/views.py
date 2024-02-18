from rest_framework.decorators import api_view
from rest_framework.response import Response
from outlets.models import Outlet
from outlets.serializers import OutletsSerializer

# Create your views here.

# get all outlets
@api_view(['GET'])
def list_subway_outlets(request):
    outlets = Outlet.objects.all()
    serialize = OutletsSerializer(outlets, many=True)
    return Response(serialize.data)