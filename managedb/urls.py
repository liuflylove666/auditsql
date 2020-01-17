from django.conf.urls import url
from .views import DatabaseInfo, DatabaseInfoDetail

urlpatterns = [
    url('^databaseinfo/$', DatabaseInfo.as_view()),
    url('^databaseinfo/(?P<pk>[\w]+)/', DatabaseInfoDetail.as_view())
]
