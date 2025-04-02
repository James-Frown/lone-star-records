from django.contrib import admin
from .models import Artist, Song, Appearance

# Customize Artist admin
class ArtistAdmin(admin.ModelAdmin):
    list_display = ['name', 'artist_fee', 'is_active', 'start_date', 'end_date']
    list_filter = ['is_active']
    search_fields = ['name']

# Register your models
admin.site.register(Artist, ArtistAdmin)  # Use the customized admin class
admin.site.register(Song)
admin.site.register(Appearance)