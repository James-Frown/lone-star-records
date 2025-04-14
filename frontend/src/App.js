import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [appearances, setAppearances] = useState([]);
  const [error, setError] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);

  useEffect(() => {
    // Automatically load artists when the component mounts
    axios
      .get("http://localhost:8000/api/artists/", {
        headers: {
          Authorization: process.env.REACT_APP_AUTH_TOKEN,
        },
      })
      .then((response) => {
        setArtists(response.data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const getSongs = () => {
    axios
      .get("http://localhost:8000/api/songs/", {
        headers: {
          Authorization: process.env.REACT_APP_AUTH_TOKEN,
        },
      })
      .then((response) => {
        setSongs(response.data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const getAppearances = () => {
    axios
      .get("http://localhost:8000/api/appearances/", {
        headers: {
          Authorization: process.env.REACT_APP_AUTH_TOKEN,
        },
      })
      .then((response) => {
        setAppearances(response.data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleArtistChange = (event) => {
    const artistId = event.target.value;
    const artist = artists.find((artist) => artist.id === parseInt(artistId));
    setSelectedArtist(artist);

    // Fetch songs and appearances when an artist is selected
    getSongs();
    getAppearances();
  };

  const handleEditArtist = (artistId) => {
    const updatedName = prompt("Enter new name for the artist:");
    console.log(updatedName);
    if (!updatedName) return;

    axios
      .patch(
        `http://localhost:8000/api/artists/${artistId}/`,
        { name: updatedName },
        {
          headers: {
            Authorization: process.env.REACT_APP_AUTH_TOKEN,
          },
        }
      )
      .then((response) => {
        setArtists((artists) =>
          artists.map((artist) =>
            artist.id === artistId ? response.data : artist
          )
        );
        setError(null);
        alert("Artist updated successfully!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleRemoveArtist = (artistId) => {
    if (!window.confirm("Are you sure you want to delete this artist?")) return;

    axios
      .delete(`http://localhost:8000/api/artists/${artistId}/`, {
        headers: {
          Authorization: process.env.REACT_APP_AUTH_TOKEN,
        },
      })
      .then(() => {
        setArtists((prevArtists) =>
          prevArtists.filter((artist) => artist.id !== artistId)
        );
        setSelectedArtist(null);
        setError(null);
        alert("Artist removed successfully!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleAddArtist = () => {
    const name = prompt("Enter artist's name:");
    if (!name) return;

    const bio = prompt("Enter artist's bio:");
    const startDate = prompt("Enter artist's start date (YYYY-MM-DD):");
    const endDate = prompt(
      "Enter artist's end date (YYYY-MM-DD) or leave blank if still active:"
    );
    const isActive = window.confirm("Is the artist currently active?");
    const fee = prompt("Enter artist's fee:");

    if (!fee || isNaN(fee)) {
      alert("Invalid fee entered. Please try again.");
      return;
    }

    const newArtist = {
      name,
      bio,
      start_date: startDate,
      end_date: endDate || null,
      is_active: isActive,
      fee: parseFloat(fee),
    };

    axios
      .post("http://localhost:8000/api/artists/", newArtist, {
        headers: {
          Authorization: process.env.REACT_APP_AUTH_TOKEN,
        },
      })
      .then((response) => {
        setArtists((prevArtists) => [...prevArtists, response.data]);
        setError(null);
        alert("Artist added successfully!");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", fontSize: "16px" }}>
      <h1 style={{ fontSize: "24px" }}>Welcome to Lone Star Records</h1>
      <p style={{ marginTop: "10px", fontSize: "18px", color: "#555" }}>
        Lone Star Records is a fictional record label where you can manage
        artists, their songs, and appearances. This app allows you to add, edit,
        and remove artists, as well as view their songs and past performances.
      </p>

      <div style={{ marginTop: "20px" }}></div>
      <button
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "background-color 0.3s, transform 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#45a049")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        onClick={handleAddArtist}
      >
        Add Artist
      </button>
      {artists.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <select
            id="artists-dropdown"
            style={{
              marginLeft: "10px",
              fontSize: "16px",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#f9f9f9",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s, transform 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f1f1f1")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#f9f9f9")}
            onMouseDown={(e) => (e.target.style.transform = "scale(0.95)")}
            onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
            onChange={handleArtistChange}
          >
            <option value="" disabled selected>
              Select an artist
            </option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
          {selectedArtist && (
            <div
              style={{
                marginTop: "20px",
                padding: "10px",
                borderRadius: "5px",
                fontSize: "16px",
              }}
            >
              <h3 style={{ fontSize: "20px" }}>Artist Details</h3>
              <p>
                <strong>Name:</strong> {selectedArtist.name}
              </p>
              <p>
                <strong>Bio:</strong> {selectedArtist.bio}
              </p>
              <p>
                <strong>Active:</strong>{" "}
                <input
                  type="checkbox"
                  checked={!selectedArtist.end_date}
                  readOnly
                />
              </p>
              {selectedArtist.start_date && (
                <p>
                  <strong>Start Date:</strong> {selectedArtist.start_date}
                </p>
              )}
              {selectedArtist.end_date && (
                <p>
                  <strong>End Date:</strong> {selectedArtist.end_date}
                </p>
              )}

              <div style={{ marginTop: "20px" }}>
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginRight: "10px",
                  }}
                  onClick={() => handleEditArtist(selectedArtist.id)}
                >
                  Edit Artist
                </button>
                <button
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#f44336",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleRemoveArtist(selectedArtist.id)}
                >
                  Remove Artist
                </button>
              </div>

              <div style={{ marginTop: "20px" }}>
                <h4 style={{ fontSize: "18px" }}>Songs</h4>
                {songs.filter((song) => song.artist_id === selectedArtist.id)
                  .length > 0 ? (
                  <div>
                    {songs
                      .filter((song) => song.artist_id === selectedArtist.id)
                      .map((song) => (
                        <div
                          key={song.id}
                          style={{
                            marginBottom: "10px",
                            padding: "10px",
                            borderRadius: "5px",
                            fontSize: "16px",
                          }}
                        >
                          <p>
                            <strong>Title:</strong> {song.title}
                          </p>
                          <p>
                            <strong>Plays:</strong> {song.plays}
                          </p>
                          <p>
                            <strong>Release Date:</strong> {song.release_date}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p>No songs available for this artist.</p>
                )}
              </div>

              <div style={{ marginTop: "20px" }}>
                <h4 style={{ fontSize: "18px" }}>Appearances</h4>
                {appearances.filter(
                  (appearance) => appearance.artist_id === selectedArtist.id
                ).length > 0 ? (
                  <div>
                    {appearances
                      .filter(
                        (appearance) =>
                          appearance.artist_id === selectedArtist.id
                      )
                      .map((appearance) => (
                        <div
                          key={appearance.id}
                          style={{
                            marginBottom: "10px",
                            padding: "10px",
                            borderRadius: "5px",
                            fontSize: "16px",
                          }}
                        >
                          <p>
                            <strong>Date:</strong> {appearance.date}
                          </p>
                          <p>
                            <strong>Location:</strong> {appearance.location}
                          </p>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p>No appearances available for this artist.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
