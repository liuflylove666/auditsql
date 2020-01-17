from rest_framework import serializers

from users.models import Account

class UsersInfo(serializers.HyperlinkedModelSerializer):
    '''
        用户信息列表序列化
    '''
    class Meta:
        model = Account
        fields = ('username', 'group', 'department', 'email')
