from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Artist, Song, Appearance
from .serializers import ArtistSerializer, SongSerializer, AppearanceSerializer
from django.utils import timezone

class ArtistListCreateView(generics.ListCreateAPIView):  # GET, POST for Artist
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [IsAuthenticated]

class ArtistRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):  # GET, PUT, PATCH, DELETE for Artist
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_at=timezone.now())

    def perform_destroy(self, instance):
        instance.delete()

class ActiveArtistListView(generics.ListAPIView):  # GET for active Artists
    serializer_class = ArtistSerializer
    permission_classes = [IsAuthenticated]
        
    def get_queryset(self):
        return Artist.objects.filter(is_active=True).filter(
            end_date__isnull=True) | Artist.objects.filter(
            is_active=True).filter(end_date__gte=timezone.now()
        )

class SongListCreateView(generics.ListCreateAPIView):  # GET, POST for Song
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [IsAuthenticated]
    
class SongRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):  # GET, PUT, PATCH, DELETE for Song
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [IsAuthenticated]

class AppearanceListCreateView(generics.ListCreateAPIView):  # GET, POST for Appearance
    queryset = Appearance.objects.all()
    serializer_class = AppearanceSerializer
    permission_classes = [IsAuthenticated]
    
class AppearanceRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):  # GET, PUT, PATCH, DELETE for Appearance
    queryset = Appearance.objects.all()
    serializer_class = AppearanceSerializer
    permission_classes = [IsAuthenticated]
