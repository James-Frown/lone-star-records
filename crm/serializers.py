from rest_framework import serializers
from .models import Artist, Song, Appearance

class ArtistSerializer(serializers.ModelSerializer):
    is_currently_active = serializers.SerializerMethodField()

    class Meta:
        model = Artist
        fields = ['id', 'name', 'age', 'bio', 'artist_fee', 'is_active', 'start_date', 'end_date', 'is_currently_active']

    def get_is_currently_active(self, obj):
        return obj.is_currently_active()

class SongSerializer(serializers.ModelSerializer):
    artist_name = serializers.ReadOnlyField()
    artist_id = serializers.ReadOnlyField()

    class Meta:
        model = Song
        fields = ['id', 'title', 'artist', 'release_date', 'plays', 'artist_name', 'artist_id']

class AppearanceSerializer(serializers.ModelSerializer):
    artist_name = serializers.ReadOnlyField()
    artist_id = serializers.ReadOnlyField()

    class Meta:
        model = Appearance
        fields = ['id', 'date', 'location', 'artist', 'artist_name', 'artist_id']