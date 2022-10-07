import React, { useEffect, useRef, useState } from "react";
import "../styles/footer.css";
import playWhite from "../assets/icons/play-white.svg";
import noAlbum from "../assets/picture-no-album.png";
const Footer = ({
  songTitle,
  songArtist,
  songImg,
  song,
  isPlaying,
  setIsPlaying,
  progress,
  setProgress,
}) => {
  const [length, setLength] = useState(0);
  const [durationMinute, setDurationMinute] = useState(0);
  const [durationSecond, setDurationSecond] = useState(0);
  const [currentMinute, setCurrentMinute] = useState(0);
  const [currentSecond, setCurrentSecond] = useState(0);
  const audioRef = useRef();
  const clickRefrence = useRef();

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  const onPlaying = () => {
    const duration = audioRef.current.duration;
    const currentTime = audioRef.current.currentTime;
    setProgress((currentTime / duration) * 100);
    setDurationMinute(Math.floor(duration / 60));
    setDurationSecond(Math.floor(((audioRef.current.duration / 60) % 1) * 60));
    setCurrentMinute(Math.floor(audioRef.current.currentTime / 60));
    setCurrentSecond(
      Math.floor(
        audioRef.current.currentTime -
          Math.floor(audioRef.current.currentTime / 60) * 60
      )
    );
    setLength(duration);
  };

  const checkWidth = (event) => {
    let width = clickRefrence.current.clientWidth;
    const offset = event.nativeEvent.offsetX;
    const divProgress = (offset / width) * 100;
    audioRef.current.currentTime = (divProgress / 100) * length;
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  return (
    <div className="footer">
      <div className="footer-container">
        {songImg ? (
          <img src={songImg} alt="no album" width={64} />
        ) : (
          <img
            src={noAlbum}
            onError={(event) => (event.currentTarget.src = noAlbum)}
            width={64}
            alt="no album"
          />
        )}
        <audio src={song} ref={audioRef} onTimeUpdate={onPlaying} />
        <div
          style={{
            color: "#A3A3A3",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-around",
            paddingLeft: 8,
          }}
        >
          <h5>{songTitle}</h5>
          <h5>{songArtist}</h5>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {!isPlaying ? (
          <img
            src={playWhite}
            width={32}
            alt="play"
            style={{ marginTop: 23, marginBottom: 21 }}
            onClick={handleClick}
          />
        ) : (
          <img
            src="/pause-button-svgrepo-com.svg"
            width={32}
            alt="play"
            style={{ marginTop: 23, marginBottom: 21 }}
            onClick={handleClick}
          />
        )}
        <div
          style={{
            width: "38%",
            
            display: "flex",
            alignContent: "center",
            justifyContent: "space-evenly",
            fontSize: 12,
          }}
        >
          {currentMinute ? currentMinute + " : " + currentSecond : "00 : 00"}

          <div className="navigation">
            <div
              className="navigation_wrapper"
              onClick={checkWidth}
              ref={clickRefrence}
            >
              <div className="seek_bar" style={{ width: progress + "%" }}></div>
            </div>
          </div>
          {durationMinute ? durationMinute + " : " + durationSecond : "00 : 00"}
        </div>
      </div>
    </div>
  );
};

export default Footer;
