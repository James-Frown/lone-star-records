from django.urls import path
from .views import ArtistListCreateView, SongListCreateView, AppearanceListCreateView

urlpatterns = [
    path('artists/', ArtistListCreateView.as_view(), name='artist-list-create'),
    path('songs/', SongListCreateView.as_view(), name='song-list-create'),
    path('appearances/', AppearanceListCreateView.as_view(), name='appearance-list-create'),
]