import React, { useState } from "react";
import axios from "axios";

function App() {
  const [artists, setArtists] = useState([]);
  const [error, setError] = useState(null);
  const [showArtists, setShowArtists] = useState(false);

  const fetchArtists = () => {
    axios
      .get(process.env.REACT_APP_API_URL, {
        headers: {
          Authorization: process.env.REACT_APP_AUTH_TOKEN,
        },
      })
      .then((response) => {
        setArtists(response.data);
        setShowArtists(true);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setShowArtists(false);
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Lone Star Records</h1>
      <p>Your one-stop destination for amazing artists and performances!</p>
      <button
        onClick={fetchArtists}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        See Active Artists
      </button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {showArtists && (
        <div>
          <h2>Active Artists</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {artists.map((artist) => (
              <li
                key={artist.id}
                style={{
                  border: "1px solid #ddd",
                  margin: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  textAlign: "left",
                  maxWidth: "400px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <h3>{artist.name}</h3>
                <p>{artist.bio}</p>
                <p>Fee: ${artist.artist_fee}</p>
                <p>Active From: {artist.start_date}</p>
                <p>Active Until: {artist.end_date}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
