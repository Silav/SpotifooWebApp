import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import Nav from "./nav";
import noAlbum from "../assets/picture-no-album.png";
import Footer from "./footer";
import axios from "axios";
const Home = () => {
  const [data, setData] = useState([]);
  const [genre, setGenre] = useState([]);
  const [songTitle, setSongTitle] = useState("Welcome to the family");
  const [songArtist, setSongArtist] = useState("Avenged Sevenfold");
  const [songImg, setSongImg] = useState("/images/nightmare.png");
  const [song, setSong] = useState("/music/jump.mp3");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  let navigation = useNavigate();

  function getUniqueListBy(arr, key) {
    return [...new Map(arr.map((item) => [item[key], item])).values()];
  }

  const artist = getUniqueListBy(data, "artist");
  const album = getUniqueListBy(data, "album");

  const handleClick = (e, artist, filter, img) => {
    if (img) {
      const image = img.slice(8);
      navigation(`/song/${filter}/${artist}/${image}`);
    } else {
      const pic = "picture-no-album.png";
      navigation(`/song/${filter}/${artist}/${pic}`);
    }
  };

  const getData = async () => {
    await axios("http://localhost:8080/music")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const getGenre = async () => {
    await axios("http://localhost:8080/genre")
      .then((res) => setGenre(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getData();
    getGenre();
  }, []);
  return (
    <>
      <Nav />
      <div className="home-container">
        <div className="content-container">
          <h1>Artist</h1>
          <div className="section">
            {artist.map((ar) => {
              return (
                <div
                  className="item-container"
                  onClick={(e) =>
                    handleClick(e, ar.artist, "artist", ar.pathToAlbum)
                  }
                >
                  <div className="img-heading-container">
                    <img
                      src={ar.pathToAlbum ? ar.pathToAlbum : noAlbum}
                      alt="album"
                      className="img"
                    />
                    <div className="text">
                      <h3>{ar.artist}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <h1 style={{ color: "white", marginTop: 32 }}>Album</h1>
          <div className="section">
            {album.map((map) => {
              return (
                <div
                  className="item-container"
                  onClick={(e) =>
                    handleClick(e, map.album, "album", map.pathToAlbum)
                  }
                >
                  <div className="img-heading-container">
                    <img
                      src={map.pathToAlbum ? map.pathToAlbum : noAlbum}
                      alt="album"
                      className="img"
                    />
                    <div className="text">
                      <h3 style={{ textOverflow: "ellipsis" }}>{map.album}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <h1>Genres</h1>
          <div className="section">
            {genre.map((gen) => {
              return (
                <div
                  className="item-container"
                  onClick={(e) => handleClick(e, gen, "genre", gen.pathToAlbum)}
                >
                  <div className="img-heading-container">
                    <img src={noAlbum} alt="album" className="img" />
                    <div className="text">
                      <h3 style={{ textOverflow: "ellipsis" }}>{gen}</h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer
        songTitle={songTitle}
        songArtist={songArtist}
        songImg={songImg}
        song={song}
        progress={progress}
        setProgress={setProgress}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </>
  );
};

export default Home;
