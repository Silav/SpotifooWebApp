import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "./nav";
import "../styles/search.css";
import Footer from "./footer";
import noAlbum from "../assets/picture-no-album.png";
import axios from "axios";

const Search = () => {
  const [search, setSearch] = useState([]);
  const [song, setSong] = useState("/music/jump.mp3");
  const [songTitle, setSongTitle] = useState("Welcome to the family");
  const [songArtist, setSongArtist] = useState("Avenged Sevenfold");
  const [songImg, setSongImg] = useState("/images/nightmare.png");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleClick = (e, artist, title, img, song) => {
    setIsPlaying(false);
    setSongTitle(title);
    setSongImg(img);
    setSongArtist(artist);
    setSong(song);
    setProgress(0);
  };

  const handleChangeInput = async (e) => {
    if (search.length === 0) {
      setSearch([]);
    }
    await axios(`http://localhost:8080/music?search=${e.target.value}`)
      .then((res) => setSearch(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Nav />
      <div className="home-container">
        <div className="content-container">
          <h1>Search</h1>
          <div>
            <div>
              <input type="text"  placeholder="type song title or album or artist or genre"  onChange={handleChangeInput} />
            </div>
            <div className="result">
              <h1>Result</h1>
              {search.map((item) => {
                return (
                  <div
                    className="search-result"
                    onClick={(e) =>
                      handleClick(
                        e,
                        item.artist,
                        item.title,
                        item.pathToAlbum,
                        item.pathToMusic
                      )
                    }
                  >
                    <img
                      src={item.pathToAlbum ? item.pathToAlbum : noAlbum}
                      onError={(event) => (event.currentTarget.src = noAlbum)}
                      alt="no album"
                      width={64}
                    />
                    <div className="result-title">
                      <h5>{item.title}</h5>
                      <h6>{item.artist}</h6>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Footer
        songTitle={songTitle}
        songArtist={songArtist}
        songImg={songImg}
        song={song}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        progress={progress}
        setProgress={setProgress}
      />
    </>
  );
};

export default Search;
