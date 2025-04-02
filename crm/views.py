# Create your views here.
from rest_framework import generics
from .models import Artist, Song, Appearance
from .serializers import ArtistSerializer, SongSerializer, AppearanceSerializer

class ArtistListCreateView(generics.ListCreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class SongListCreateView(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer

class AppearanceListCreateView(generics.ListCreateAPIView):
    queryset = Appearance.objects.all()
    serializer_class = AppearanceSerializer