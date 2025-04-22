from django.db import models
from datetime import date

class Artist(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    bio = models.TextField()
    artist_fee = models.DecimalField(max_digits=10, decimal_places=2)
    is_active = models.BooleanField(default=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    
    def is_currently_active(self):
        return self.is_active and (self.end_date is None or self.end_date > date.today())
    
    def __str__(self):
        return self.name

class Song(models.Model):
    title = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    release_date = models.DateField()
    plays = models.IntegerField(default=0)
    
    @property
    def artist_name(self):
        return self.artist.name
    
    @property
    def artist_id(self):
        return self.artist.id
    
    def __str__(self):
        return f"{self.title} by {self.artist.name}"

class Appearance(models.Model):
    date = models.DateField()
    location = models.CharField(max_length=200)
    artist = models.ForeignKey(Artist, on_delete=models.CASCADE)
    
    @property
    def artist_name(self):
        return self.artist.name
    
    @property
    def artist_id(self):
        return self.artist.id
    
    def __str__(self):
        return f"{self.artist.name} at {self.location} on {self.date}"