// src/AudioPlayer.jsx
import React, { useRef, useState, useEffect } from "react";

const AudioPlayer = ({ src, label }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragProgress, setDragProgress] = useState(0);

  // Parse label to separate sound number from filename
  const parsedLabel = React.useMemo(() => {
    // Expected format: "Sound X – filename.mp3"
    const match = label.match(/^(Sound \d+)\s*[–-]\s*(.+)$/);
    if (match) {
      return {
        soundNumber: match[1],
        filename: match[2]
      };
    }
    // Fallback if format doesn't match
    return {
      soundNumber: label,
      filename: ""
    };
  }, [label]);

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

  const handleProgressClick = (e) => {
    const audio = audioRef.current;
    if (!audio || audio.duration === 0) return;

    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = clickPercent * audio.duration;

    audio.currentTime = newTime;
    setProgress(clickPercent * 100);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleProgressUpdate(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleProgressUpdate(e);
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const audio = audioRef.current;
    if (!audio || audio.duration === 0) return;

    const progressBar = e.currentTarget.closest('.progress-bar');
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = clickPercent * audio.duration;

    audio.currentTime = newTime;
    setProgress(clickPercent * 100);
  };

  const handleProgressUpdate = (e) => {
    const progressBar = e.currentTarget.closest('.progress-bar') || e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickPercent = Math.max(0, Math.min(1, clickX / rect.width));
    
    setDragProgress(clickPercent * 100);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration > 0 && !isDragging) {
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
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e) => {
      handleMouseMove(e);
    };

    const handleGlobalMouseUp = (e) => {
      handleMouseUp(e);
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={`player ${hasPlayed ? "played" : ""}`}>
      <div className="label-container">
        <p className="sound-number">{parsedLabel.soundNumber}</p>
        {parsedLabel.filename && <p className="filename">{parsedLabel.filename}</p>}
      </div>
      <button onClick={togglePlay} className="play-btn">
        {isPlaying ? "⏸ Pause" : "▶ Play"}
      </button>
      <div 
        className={`progress-bar ${isDragging ? 'dragging' : ''}`}
        onClick={handleProgressClick}
        onMouseDown={handleMouseDown}
      >
        <div 
          className="progress" 
          style={{ width: `${isDragging ? dragProgress : progress}%` }} 
        />
        <div 
          className="progress-handle" 
          style={{ left: `${isDragging ? dragProgress : progress}%` }}
        />
      </div>
      {hasPlayed && <p className="played-label">✅ Played!</p>}
      <audio ref={audioRef} src={src} />
    </div>
  );
};

export default AudioPlayer;
