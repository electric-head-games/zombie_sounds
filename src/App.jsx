// src/App.jsx
import React, { useState } from "react";
import AudioPlayer from "./AudioPlayer";
import "./App.css";

import birdBG from "./assets/1 - BirdBGShorter.mp3";
import zombie1 from "./assets/2 - Zombie Noise 1.mp3";
import airRaid from "./assets/3 - AirRaidNoScream.mp3";
import flyingZ from "./assets/4 - Flying Z.mp3";
import zombieScream from "./assets/5 - ZombiewithScream.mp3";
import zombie3 from "./assets/6 - zombieNoise3.mp3";
import chopping from "./assets/7 - Chopping.mp3";
import zombieNoise2 from "./assets/8 - zombienoise2.mp3";
import birdLanding from "./assets/9 - BirdLanding.mp3";
import birdEating from "./assets/10 - BirdEating2.mp3";

const sounds = [
  { src: birdBG, name: "1 - BirdBGShorter.mp3" },
  { src: zombie1, name: "2 - Zombie Noise 1.mp3" },
  { src: airRaid, name: "3 - AirRaidNoScream.mp3" },
  { src: flyingZ, name: "4 - Flying Z.mp3" },
  { src: zombieScream, name: "5 - ZombiewithScream.mp3" },
  { src: zombie3, name: "6 - zombieNoise3.mp3" },
  { src: chopping, name: "7 - Chopping.mp3" },
  { src: zombieNoise2, name: "8 - zombienoise2.mp3" },
  { src: birdLanding, name: "9 - BirdLanding.mp3" },
  { src: birdEating, name: "10 - BirdEating2.mp3" },
];

function App() {
  // Initialize sounds with Sound 4 disabled by default
  const [enabledSounds, setEnabledSounds] = useState(
    sounds.reduce((acc, _, idx) => ({ 
      ...acc, 
      [idx]: idx !== 3 // Sound 4 (index 3) starts disabled
    }), {})
  );

  const toggleSound = (index) => {
    setEnabledSounds(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Filter sounds based on enabled state
  const visibleSounds = sounds.filter((_, idx) => enabledSounds[idx]);

  return (
    <div className="app-container">
      <h1 className="title">Bird Guide at the End of the World Sound Board</h1>
      
      <div className="controls-section">
        <h3 className="controls-title">Select Sounds:</h3>
        <div className="checkbox-grid">
          {sounds.map((sound, idx) => (
            <label key={idx} className="checkbox-item">
              <input
                type="checkbox"
                checked={enabledSounds[idx]}
                onChange={() => toggleSound(idx)}
              />
              <span className="checkbox-label">Sound {idx + 1}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid-wrapper">
        <div className="grid">
          {visibleSounds.map((sound, originalIdx) => {
            // Find the original index to maintain proper numbering
            const soundIndex = sounds.findIndex(s => s === sound);
            return (
              <AudioPlayer
                key={soundIndex}
                src={sound.src}
                label={`Sound ${soundIndex + 1} – ${sound.name}`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
