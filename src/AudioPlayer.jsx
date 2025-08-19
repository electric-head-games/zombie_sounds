// src/AudioPlayer.jsx
import React, { useRef, useState, useEffect } from "react";

const AudioPlayer = ({ src, label }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
      setHasPlayed(true); // Mark as played when user starts playback
    }

    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration > 0) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const reset = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", reset);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", reset);
    };
  }, []);

  return (
    <div className={`player ${hasPlayed ? "played" : ""}`}>
      <p className="label">{label}</p>
      <button onClick={togglePlay} className="play-btn">
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }} />
      </div>
      {hasPlayed && <p className="played-label">✅ Played!</p>}
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
