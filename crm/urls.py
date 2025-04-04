from django.urls import path
from .views import (
    ArtistListCreateView, ArtistDetailView, ActiveArtistListView, SongListCreateView, SongDetailView, AppearanceListCreateView, AppearanceDetailView
)

urlpatterns = [
    path('artists/', ArtistListCreateView.as_view(), name='artist-list-create'),
    path('artists/<int:pk>/', ArtistDetailView.as_view(), name='artist-detail'),
    path('artists/active/', ActiveArtistListView.as_view(), name='active-artist-list'),

    path('songs/', SongListCreateView.as_view(), name='song-list-create'),
    path('songs/<int:pk>/', SongDetailView.as_view(), name='song-detail'),

    path('appearances/', AppearanceListCreateView.as_view(), name='appearance-list-create'),
    path('appearances/<int:pk>/', AppearanceDetailView.as_view(), name='appearance-detail'),
]