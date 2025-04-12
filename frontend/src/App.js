import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [artists, setArtists] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL, {
        headers: {
          Authorization: process.env.REACT_APP_AUTH_TOKEN,
        },
      })
      .then((response) => {
        setArtists(response.data);
        setFilteredArtists(response.data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const filterActiveArtists = () => {
    const now = new Date();
    setFilteredArtists(
      artists.filter(
        (artist) =>
          new Date(artist.start_date) <= now && new Date(artist.end_date) >= now
      )
    );
  };

  const resetFilter = () => {
    setFilteredArtists(artists);
  };

  const handleCreateArtist = () => {
    // Logic to create a new artist
    alert("Create Artist button clicked!");
  };

  const handleCreateAppearance = () => {
    // Logic to create a new appearance
    alert("Create Appearance button clicked!");
  };

  const handleAddSong = () => {
    // Logic to add a new song
    alert("Add Song button clicked!");
  };

  const handleUpdateArtist = (artistId) => {
    // Logic to update artist details
    alert(`Update Artist button clicked for artist ID: ${artistId}`);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Lone Star Records</h1>
      <p>Your one-stop destination for amazing artists and performances!</p>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <div style={{ marginBottom: "20px" }}>
        <button onClick={filterActiveArtists}>Show Active Artists</button>
        <button onClick={resetFilter}>Show All Artists</button>
        <button onClick={handleCreateArtist}>Create New Artist</button>
        <button onClick={handleCreateAppearance}>Create New Appearance</button>
        <button onClick={handleAddSong}>Add New Song</button>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          padding: "10px",
          gap: "10px",
        }}
      >
        {filteredArtists.map((artist) => (
          <div
            key={artist.id}
            style={{
              flex: "0 0 auto",
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              textAlign: "left",
              width: "300px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{artist.name}</h3>
            <p>{artist.bio}</p>
            <p>Fee: ${artist.artist_fee}</p>
            <p>Active From: {artist.start_date}</p>
            <p>Active Until: {artist.end_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
