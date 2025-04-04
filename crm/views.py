from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import Artist, Song, Appearance
from .serializers import ArtistSerializer, SongSerializer, AppearanceSerializer
from django.utils import timezone

class ArtistListCreateView(generics.ListCreateAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [IsAuthenticated]

class ArtistDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save(updated_at=timezone.now())

    def perform_destroy(self, instance):
        instance.delete()


class ActiveArtistListView(generics.ListAPIView):
    serializer_class = ArtistSerializer
    permission_classes = [IsAuthenticated]
        
    def get_queryset(self):
        return Artist.objects.filter(is_active=True).filter(
            end_date__isnull=True) | Artist.objects.filter(
            is_active=True).filter(end_date__gte=timezone.now()
        )

class SongListCreateView(generics.ListCreateAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [IsAuthenticated]
    
class SongDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Song.objects.all()
    serializer_class = SongSerializer
    permission_classes = [IsAuthenticated]
class AppearanceListCreateView(generics.ListCreateAPIView):
    queryset = Appearance.objects.all()
    serializer_class = AppearanceSerializer
    permission_classes = [IsAuthenticated]
    
class AppearanceDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Appearance.objects.all()
    serializer_class = AppearanceSerializer
    permission_classes = [IsAuthenticated]