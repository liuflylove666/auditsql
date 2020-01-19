from django.conf.urls import url
from .views import DatabaseInfo, DatabaseInfoDetail, DatabaseNameList, GenerationDic

urlpatterns = [
    url('^databaseinfo/$', DatabaseInfo.as_view()),
    url('^databaseinfo/(?P<pk>[\w]+)/', DatabaseInfoDetail.as_view()),
    url('^databaselist/$', DatabaseNameList.as_view()),
    url('^sqldictionary/$', GenerationDic.as_view())
]
