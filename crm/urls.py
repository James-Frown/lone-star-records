from django.urls import path
from .views import (
    ArtistListCreateView, ArtistDetailView, ActiveArtistListView, SongListCreateView, SongDetailView, AppearanceListCreateView, AppearanceDetailView
)

urlpatterns = [
    # Artist URLs
    path('api/artists/', ArtistListCreateView.as_view(), name='artist-list-create'),
    path('api/artists/<int:pk>/', ArtistDetailView.as_view(), name='artist-detail'),
    path('api/artists/active/', ActiveArtistListView.as_view(), name='active-artist-list'),
    # Song URLs
    path('api/songs/', SongListCreateView.as_view(), name='song-list-create'),
    path('api/songs/<int:pk>/', SongDetailView.as_view(), name='song-detail'),
    # Appearance URLs
    path('api/appearances/', AppearanceListCreateView.as_view(), name='appearance-list-create'),
    path('api/appearances/<int:pk>/', AppearanceDetailView.as_view(), name='appearance-detail'),
]