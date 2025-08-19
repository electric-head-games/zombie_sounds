// src/App.jsx
import React from "react";
import AudioPlayer from "./AudioPlayer";
import "./App.css";

import birdBG from "./assets/1 - BirdBGShorter.mp3";
import zombie1 from "./assets/2 - Zombie Noise 1.mp3";
import airRaid from "./assets/3 - AirRaidNoScream.mp3";
import flyingZ from "./assets/4 - Flying Z.mp3";
import zombieScream from "./assets/5 - ZombiewithScream.mp3";
import zombie2 from "./assets/6 - Zombie Noise 2.mp3";
import zombie3 from "./assets/7 - zombieNoise3.mp3";
import chopping from "./assets/8 - Chopping.mp3";
import zombieNoise2 from "./assets/9 - zombienoise2.mp3";
import birdLanding from "./assets/10 - BirdLanding.mp3";
import birdEating from "./assets/11 - BirdEating2.mp3";

const sounds = [
  { src: birdBG, name: "1 - BirdBGShorter.mp3" },
  { src: zombie1, name: "2 - Zombie Noise 1.mp3" },
  { src: airRaid, name: "3 - AirRaidNoScream.mp3" },
  { src: flyingZ, name: "4 - Flying Z.mp3" },
  { src: zombieScream, name: "5 - ZombiewithScream.mp3" },
  { src: zombie2, name: "6 - Zombie Noise 2.mp3" },
  { src: zombie3, name: "7 - zombieNoise3.mp3" },
  { src: chopping, name: "8 - Chopping.mp3" },
  { src: zombieNoise2, name: "9 - zombienoise2.mp3" },
  { src: birdLanding, name: "10 - BirdLanding.mp3" },
  { src: birdEating, name: "11 - BirdEating2.mp3" },
];

function App() {
  return (
    <div className="app-container">
      <h1 className="title">Bird Guide at the End of the World Sound Board</h1>
      <div className="grid-wrapper">
        <div className="grid">
          {sounds.map((sound, idx) => (
            <AudioPlayer
              key={idx}
              src={sound.src}
              label={`Sound ${idx + 1} – ${sound.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
