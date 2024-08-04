// src/AudioPlayer.js
import React, { useRef, useState, useEffect } from "react";
import "./AudioPlayer.css"; // Import your CSS for styling
import "./AudioPlayer.css";
const AudioPlayer = ({ src, reset, onEnd,questionId }) => {
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioPlayDisable, setAudioPlayDisable] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("ended", handleAudioEnded);
    }
  }, []);
  useEffect(() => {
    resetAudio();
  }, [reset,questionId]);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    audioRef.current.play();
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handleProgressChange = (event) => {
    const value = event.target.value;
    audioRef.current.currentTime = (value / 100) * duration;
    setProgress(value);
  };

  const updateProgress = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / duration) * 100;
      setProgress(progress);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  function resetAudio(params) {
    setProgress(0);
    setAudioPlayDisable(false);
  }

  function handleAudioEnded(params) {
    setAudioPlayDisable(true);
    onEnd()
  }
  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={updateProgress}
        onLoadedMetadata={() => setDuration(audioRef.current.duration)}
      />
      <div>
        <div className="progressBar">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
          />
          <span>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
        </div>
        <div className="buttons">
          <button onClick={handlePlayPause} disabled={audioPlayDisable}>
            Play
          </button>
          <button onClick={resetAudio}>Reset</button>
        </div>
      </div>

      <div className="volume">
        <span>Volume</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
