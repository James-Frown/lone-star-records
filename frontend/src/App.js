import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";
const AUTH_HEADERS = {
  headers: { Authorization: process.env.REACT_APP_AUTH_TOKEN },
};

const ArtistDetails = ({ artist, songs, appearances, onEdit, onRemove, setError, setSongs, setAppearances }) => {
  const artistSongs = songs.filter((song) => song.artist_id === artist.id);
  const artistAppearances = appearances.filter(
    (appearance) => appearance.artist_id === artist.id
  );

  const handleEditSong = (songId) => {
    const updatedTitle = prompt("Enter new title for the song:");
    if (!updatedTitle) return;

    const updatedPlays = parseInt(prompt("Enter updated number of plays:"), 10);
    if (isNaN(updatedPlays)) {
      alert("Invalid number of plays entered. Please try again.");
      return;
    }

    const updatedReleaseDate = prompt("Enter updated release date (YYYY-MM-DD):");

    const updatedSong = {
      title: updatedTitle,
      plays: updatedPlays,
      release_date: updatedReleaseDate,
    };

    axios
      .patch(`${API_BASE_URL}/songs/${songId}/`, updatedSong, AUTH_HEADERS)
      .then((response) => {
        setSongs((prev) =>
          prev.map((song) => (song.id === songId ? response.data : song))
        );
        alert("Song updated successfully!");
      })
      .catch((err) => setError(err.message));
  };

  const handleRemoveSong = (songId) => {
    if (!window.confirm("Are you sure you want to delete this song?")) return;

    axios
      .delete(`${API_BASE_URL}/songs/${songId}/`, AUTH_HEADERS)
      .then(() => {
        setSongs((prev) => prev.filter((song) => song.id !== songId));
        alert("Song removed successfully!");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div style={{ marginTop: "20px", padding: "10px", borderRadius: "5px" }}>
      <h3>Artist Details</h3>
      <p>
        <strong>Name:</strong> {artist.name}
      </p>
      <p>
        <strong>Bio:</strong> {artist.bio}
      </p>
      <p>
        <strong>Fee:</strong> {artist.artist_fee}
      </p>
      <p>
        <strong>Active:</strong>{" "}
        <input type="checkbox" checked={!artist.end_date} readOnly />
      </p>
      {artist.start_date && (
        <p>
          <strong>Start Date:</strong> {artist.start_date}
        </p>
      )}
      {artist.end_date && (
        <p>
          <strong>End Date:</strong> {artist.end_date}
        </p>
      )}

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => onEdit(artist.id)}
          style={buttonStyle("#2196F3")}
        >
          Edit Artist
        </button>
        <button
          onClick={() => onRemove(artist.id)}
          style={buttonStyle("#f44336")}
        >
          Remove Artist
        </button>
      </div>

      <Section
        title="Songs"
        items={artistSongs}
        renderItem={(song) => (
          <>
            <p>
              <strong>Title:</strong> {song.title}
            </p>
            <p>
              <strong>Plays:</strong> {song.plays}
            </p>
            <p>
              <strong>Release Date:</strong> {song.release_date}
            </p>
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => handleEditSong(song.id)}
                style={buttonStyle("#2196F3")}
              >
                Edit Song
              </button>
              <button
                onClick={() => handleRemoveSong(song.id)}
                style={buttonStyle("#f44336")}
              >
                Remove Song
              </button>
            </div>
          </>
        )}
      />

      <Section
        title="Appearances"
        items={artistAppearances}
        renderItem={(appearance) => (
          <>
            <p>
              <strong>Date:</strong> {appearance.date}
            </p>
            <p>
              <strong>Location:</strong> {appearance.location}
            </p>
            <div style={{ marginTop: "10px" }}>
              <button
                onClick={() => {
                  const updatedDate = prompt(
                    "Enter new date for the appearance (YYYY-MM-DD):",
                    appearance.date
                  );
                  if (!updatedDate) return;

                  const updatedLocation = prompt(
                    "Enter new location for the appearance:",
                    appearance.location
                  );
                  if (!updatedLocation) return;

                  const updatedAppearance = {
                    date: updatedDate,
                    location: updatedLocation,
                  };

                  axios
                    .patch(
                      `${API_BASE_URL}/appearances/${appearance.id}/`,
                      updatedAppearance,
                      AUTH_HEADERS
                    )
                    .then((response) => {
                      setAppearances((prev) =>
                        prev.map((app) =>
                          app.id === appearance.id ? response.data : app
                        )
                      );
                      alert("Appearance updated successfully!");
                    })
                    .catch((err) => setError(err.message));
                }}
                style={buttonStyle("#2196F3")}
              >
                Edit Appearance
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this appearance?"
                    )
                  ) {
                    axios
                      .delete(
                        `${API_BASE_URL}/appearances/${appearance.id}/`,
                        AUTH_HEADERS
                      )
                      .then(() => {
                        setAppearances((prev) =>
                          prev.filter((app) => app.id !== appearance.id)
                        );
                        alert("Appearance removed successfully!");
                      })
                      .catch((err) => setError(err.message));
                  }
                }}
                style={buttonStyle("#f44336")}
              >
                Remove Appearance
              </button>
            </div>
          </>
        )}
      />
    </div>
  );
};

const Section = ({ title, items, renderItem }) => (
  <div style={{ marginTop: "20px" }}>
    <h4>{title}</h4>
    {items.length > 0 ? (
      items.map((item) => (
        <div key={item.id} style={{ marginBottom: "10px", padding: "10px" }}>
          {renderItem(item)}
        </div>
      ))
    ) : (
      <p>No {title.toLowerCase()} available.</p>
    )}
  </div>
);

const buttonStyle = (bgColor) => ({
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: bgColor,
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "10px",
});

function App() {
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState([]);
  const [appearances, setAppearances] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData("artists", setArtists);
  }, []);

  const fetchData = (endpoint, setter) => {
    axios
      .get(`${API_BASE_URL}/${endpoint}/`, AUTH_HEADERS)
      .then((response) => setter(response.data))
      .catch((err) => setError(err.message));
  };

  const handleArtistChange = (event) => {
    const artistId = parseInt(event.target.value);
    const artist = artists.find((artist) => artist.id === artistId);
    setSelectedArtist(artist);
    fetchData("songs", setSongs);
    fetchData("appearances", setAppearances);
  };

  const handleEditArtist = (artistId) => {
    const updatedName = prompt("Enter new name for the artist:");
    if (!updatedName) return;

    axios
      .patch(
        `${API_BASE_URL}/artists/${artistId}/`,
        { name: updatedName },
        AUTH_HEADERS
      )
      .then((response) => {
        setArtists((prev) =>
          prev.map((artist) =>
            artist.id === artistId ? response.data : artist
          )
        );
        alert("Artist updated successfully!");
      })
      .catch((err) => setError(err.message));
  };

  const handleRemoveArtist = (artistId) => {
    if (!window.confirm("Are you sure you want to delete this artist?")) return;

    axios
      .delete(`${API_BASE_URL}/artists/${artistId}/`, AUTH_HEADERS)
      .then(() => {
        setArtists((prev) => prev.filter((artist) => artist.id !== artistId));
        setSelectedArtist(null);
        alert("Artist removed successfully!");
      })
      .catch((err) => setError(err.message));
  };

  const handleAddArtist = () => {
    const name = prompt("Enter artist's name:");
    if (!name) return;

    const bio = prompt("Enter artist's bio:");
    const startDate = prompt("Enter artist's start date (YYYY-MM-DD):");
    const endDate = prompt(
      "Enter artist's end date (YYYY-MM-DD) or leave blank:"
    );
    const isActive = window.confirm("Is the artist currently active?");
    const artist_fee = parseFloat(prompt("Enter artist's fee:"));

    if (isNaN(artist_fee)) {
      alert("Invalid fee entered. Please try again.");
      return;
    }

    const newArtist = {
      name,
      bio,
      start_date: startDate,
      end_date: endDate || null,
      is_active: isActive,
      artist_fee,
    };

    console.log("New Artist Data:", newArtist);

    axios
      .post(`${API_BASE_URL}/artists/`, newArtist, AUTH_HEADERS)
      .then((response) => {
        setArtists((prev) => [...prev, response.data]);
        alert("Artist added successfully!");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleAddSong = () => {
    if (!selectedArtist) {
      alert("Please select an artist first.");
      return;
    }

    const title = prompt("Enter song title:");
    if (!title) return;

    const plays = parseInt(prompt("Enter number of plays:"), 10);
    if (isNaN(plays)) {
      alert("Invalid number of plays entered. Please try again.");
      return;
    }

    const releaseDate = prompt("Enter release date (YYYY-MM-DD):");

    const newSong = {
      title,
      plays,
      release_date: releaseDate,
      artist: selectedArtist.id,
    };

    console.log("New Song Data:", newSong);

    axios
      .post(`${API_BASE_URL}/songs/`, newSong, AUTH_HEADERS)
      .then((response) => {
        setSongs((prev) => [...prev, response.data]);
        alert("Song added successfully!");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleAddAppearance = () => {
    if (!selectedArtist) {
      alert("Please select an artist first.");
      return;
    }

    const date = prompt("Enter appearance date (YYYY-MM-DD):");
    if (!date) return;

    const location = prompt("Enter appearance location:");
    if (!location) return;

    const newAppearance = {
      date,
      location,
      artist: selectedArtist.id,
    };

    console.log("New Appearance Data:", newAppearance);

    axios
      .post(`${API_BASE_URL}/appearances/`, newAppearance, AUTH_HEADERS)
      .then((response) => {
        setAppearances((prev) => [...prev, response.data]);
        alert("Appearance added successfully!");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Lone Star Records</h1>
      <p>
        Manage artists, their songs, and appearances. Add, edit, or remove
        artists easily.
      </p>

      <button onClick={handleAddArtist} style={buttonStyle("#4CAF50")}>
        Add Artist
      </button>
      <button onClick={handleAddSong} style={buttonStyle("#2196F3")}>
        Add Song
      </button>
      <button onClick={handleAddAppearance} style={buttonStyle("#FF9800")}>
        Add Appearance
      </button>

      {artists.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <select
            onChange={handleArtistChange}
            style={{ padding: "10px", fontSize: "16px" }}
          >
            <option defaultValue="Select an artist">
              Select an artist
            </option>
            {artists.map((artist) => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>

          {selectedArtist && (
            <ArtistDetails
              artist={selectedArtist}
              songs={songs}
              appearances={appearances}
              onEdit={handleEditArtist}
              onRemove={handleRemoveArtist}
              setError={setError}
              setSongs={setSongs}
              setAppearances={setAppearances}
            />
          )}
        </div>
      )}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}

export default App;
