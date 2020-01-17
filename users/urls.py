from django.urls import path
from django.conf.urls import url

from .views import login_auth, UserInfoViewSet, UserInfoDetail

urlpatterns = [
    url('^api-token-auth/$', login_auth.as_view()),
    url('^userinfo/$', UserInfoViewSet.as_view()),
    url('^userinfo/(?P<pk>[\w]+)/', UserInfoDetail.as_view()),
]
