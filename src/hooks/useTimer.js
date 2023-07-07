// hooks/useTimer.js
import { useState, useEffect } from 'react';
import { playBeep } from '../utils/audioUtils';
import { loadFromLocalStorage } from '../utils/localStorage';

export default function useTimer(initialNeedToDoMinutes, initialWantToDoMinutes) {
  const [needToDoTime, setNeedToDoTime] = useState((loadFromLocalStorage('needToDoTime') || initialNeedToDoMinutes) * 60);
  const [wantToDoTime, setWantToDoTime] = useState((loadFromLocalStorage('wantToDoTime') || initialWantToDoMinutes) * 60);
  const [timeLeft, setTimeLeft] = useState(needToDoTime);
  const [isNeedToDoTime, setIsNeedToDoTime] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      const id = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setIntervalId(id);
      playBeep();
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(intervalId);
    }
  };

  const reset = () => {
    stop();
    setTimeLeft(isNeedToDoTime ? needToDoTime : wantToDoTime);
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setIsNeedToDoTime(!isNeedToDoTime);
      setTimeLeft(isNeedToDoTime ? wantToDoTime : needToDoTime);
      playBeep();
    }
  }, [timeLeft, isNeedToDoTime, needToDoTime, wantToDoTime]);

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
    isRunning
  };
}
