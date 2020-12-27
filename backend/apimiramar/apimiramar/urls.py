
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from .settings import DEBUG
import debug_toolbar

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('managemiramar.urls')),
    path('ckeditor', include('ckeditor_uploader.urls')),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if DEBUG:
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls)),]
