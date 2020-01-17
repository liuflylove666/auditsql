from rest_framework import serializers

from .models import DatabaseList

class SqlInfoList(serializers.HyperlinkedModelSerializer):
    '''
        用户信息列表序列化
    '''
    class Meta:
        model = DatabaseList
        fields = ('id', 'conn_name', 'computer_room', 'ip_address', 'port', 'conn_user')
