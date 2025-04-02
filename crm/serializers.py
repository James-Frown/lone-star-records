from rest_framework import serializers
from .models import Artist, Song, Appearance

class ArtistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artist
        fields = ['id', 'name', 'bio', 'artist_fee', 'is_active', 'start_date', 'end_date']

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'title', 'artist', 'release_date', 'plays']

class AppearanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appearance
        fields = ['id', 'date', 'location', 'artist']