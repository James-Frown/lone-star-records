from django.urls import path
from .views import (
    ArtistListCreateView, ArtistRetrieveUpdateDestroyView, ActiveArtistListView,
    SongListCreateView, SongRetrieveUpdateDestroyView,
    AppearanceListCreateView, AppearanceRetrieveUpdateDestroyView
)
urlpatterns = [
    path('artists/', ArtistListCreateView.as_view(), name='artist-list-create'),
    path('artists/<int:pk>/', ArtistRetrieveUpdateDestroyView.as_view(), name='artist-detail'),
    path('artists/active/', ActiveArtistListView.as_view(), name='active-artist-list'),

    path('songs/', SongListCreateView.as_view(), name='song-list-create'),
    path('songs/<int:pk>/', SongRetrieveUpdateDestroyView.as_view(), name='song-detail'),

    path('appearances/', AppearanceListCreateView.as_view(), name='appearance-list-create'),
    path('appearances/<int:pk>/', AppearanceRetrieveUpdateDestroyView.as_view(), name='appearance-detail'),
]
