import { useState, useEffect, useCallback  } from 'react';
import { loadFromLocalStorage } from '../utils/localStorage';
import { useAlarm } from './useAlarm';

export default function useTimer(initialNeedToDoMinutes, initialWantToDoMinutes) {
  const [needToDoTime, setNeedToDoTime] = useState((loadFromLocalStorage('needToDoTime') || initialNeedToDoMinutes) * 60);
  const [wantToDoTime, setWantToDoTime] = useState((loadFromLocalStorage('wantToDoTime') || initialWantToDoMinutes) * 60);
  const [timeLeft, setTimeLeft] = useState(loadFromLocalStorage('timeLeft') || needToDoTime);
  const [isNeedToDoTime, setIsNeedToDoTime] = useState(true);
  const [isRunning, setIsRunning] = useState(loadFromLocalStorage('isRunning') || false);

  const { isAlarmPlaying, startContinuousAlarm, stopContinuousAlarm } = useAlarm();

  const isFinished = useCallback(() => timeLeft === 0, [timeLeft]);

  const hasProgressed = () => {
    const initialTime = isNeedToDoTime ? needToDoTime : wantToDoTime;
    console.log("timeleft", timeLeft, "initialtime:", initialTime, timeLeft !== initialTime)
    return isRunning || timeLeft !== initialTime;
  };
  
  useEffect(() => {
    if (!isRunning) return;
  
    if (isFinished()) {
      startContinuousAlarm();
      return;
    }
  
    let lastUpdateTime = Date.now();
  
    const tick = () => {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - lastUpdateTime) / 1000);
      const newTimeLeft = timeLeft - elapsedSeconds;
      setTimeLeft(Math.max(newTimeLeft, 0));
      lastUpdateTime = currentTime; // Update the last update time
    };
  
    const intervalId = setInterval(tick, 1000);
  
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalId);
      } else {
        tick(); // Adjust timeLeft based on the actual elapsed time
        setInterval(tick, 1000); // Restart the interval
      }
    };
  
    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
  
    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, timeLeft, isNeedToDoTime, isFinished, startContinuousAlarm]);
  

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      stopContinuousAlarm();

      // Only switch the timer if it has finished
      if (isFinished()) {
        switchTimer();
      }
    }
  };



const reset = () => {
  const newTime = isNeedToDoTime ? needToDoTime : wantToDoTime;
  setTimeLeft(newTime);
  setIsRunning(false);
};


  const switchTimer = () => {
    const newIsNeedToDoTime = !isNeedToDoTime;
    setIsNeedToDoTime(newIsNeedToDoTime);
    reset(newIsNeedToDoTime);
  };

  return {
    needToDoTime,
    wantToDoTime,
    timeLeft,
    isNeedToDoTime,
    setNeedToDoTime,
    setWantToDoTime,
    start,
    stop,
    reset,
    isRunning,
    switchTimer,
    isAlarmPlaying,
    hasProgressed
  };
}

