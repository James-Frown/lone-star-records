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

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to Lone Star Records</h1>

      {artists.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <label htmlFor="artists-dropdown">Select an Artist:</label>
          <select
            id="artists-dropdown"
            style={{ marginLeft: "10px" }}
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
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <h3>Artist Details</h3>
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
                <h4>Songs</h4>
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
                            border: "1px solid #ddd",
                            borderRadius: "5px",
                          }}
                        >
                          <p>
                            <strong>Title:</strong> {song.title}
                          </p>
                          <p>
                            <strong>Duration:</strong> {song.duration}
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
                <h4>Appearances</h4>
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
                            border: "1px solid #ddd",
                            borderRadius: "5px",
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
