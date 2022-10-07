import React, { useEffect, useRef, useState } from "react";
import "../styles/song.css";
import Footer from "./footer";
import Nav from "./nav";
import noAlbum from "../assets/picture-no-album.png";
import { useParams } from "react-router-dom";
import axios from "axios";

const Song = () => {
  const [data, setData] = useState([]);
  const [song, setSong] = useState("/music/jump.mp3");
  const [isPlaying, setIsPlaying] = useState(false);
  const [songTitle, setSongTitle] = useState("Welcome to the family");
  const [songArtist, setSongArtist] = useState("Avenged Sevenfold");
  const [songImg, setSongImg] = useState("/images/nightmare.png");
  const [picture, setPicture] = useState("");
  const [progress, setProgress] = useState(0);

  const { filter, search, image } = useParams();

  const handlesongclick = (e, music, title, artist, img) => {
    setSong(music);
    setSongTitle(title);
    setSongArtist(artist);
    setSongImg(img);
    setIsPlaying(false);
    setProgress(0);
  };

  const getdata = async () => {
    await axios(`http://localhost:8080/music?filter=${filter}&search=${search}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getdata();
    if (image !== "picture-no-album.png") {
      setPicture("/images/" + image);
    } else {
      setPicture(noAlbum);
    }
  }, []);
  return (
    <>
      <Nav />
      <div className="home-container">
        <div>
          <div className="album-container">
            <div className="album-title">
              <img src={picture} width={240} />
              <div className="genre-title">
                <h5>
                  {filter === "artist"
                    ? "Artist"
                    : filter === "album"
                    ? "Album"
                    : "Genre"}
                </h5>
                <h1>
                  {data.length !== 0
                    ? filter === "artist"
                      ? data[0].artist
                      : filter === "album"
                      ? data[0].album
                      : ""
                    : ""}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="album-text">
          <h4 className="album-text-title">
            <span style={{ marginRight: 17 }}>#</span>Title
          </h4>
          <hr className="line" />
          {data.map((item, index) => {
            return (
              <div
                className="album-detail"
                onClick={(e) =>
                  handlesongclick(
                    e,
                    item.pathToMusic,
                    item.title,
                    item.artist,
                    item.pathToAlbum
                  )
                }
              >
                <h6>{index + 1}</h6>
                <div className="title-detail">
                  <h4 className="title-detail-h4">{item.title}</h4>
                  <h6>{item.artist}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songTitle={songTitle}
        songArtist={songArtist}
        songImg={songImg}
        song={song}
        progress={progress}
        setProgress={setProgress}
      />
    </>
  );
};

export default Song;
