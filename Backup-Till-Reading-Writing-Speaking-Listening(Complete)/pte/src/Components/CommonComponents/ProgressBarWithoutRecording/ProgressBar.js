import React, { useState, useEffect } from 'react';
import './ProgressBar.css'; // Optional for styling

const ProgressBar = ({ duration }) => {
  
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Reset progress when duration changes
    setProgress(0);
    
    // Calculate the interval based on the duration
    const interval = 100; // Update every 100ms
    const step = (interval / duration) * 100; // Percentage to increment each step
    
    // Set up an interval to update progress
    const timer = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + step;
        if (newProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return newProgress;
      });
    }, interval);
    
    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [duration]);
  
  return (
    <div className="progress-container">
      <div 
        className="progress-bar" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
