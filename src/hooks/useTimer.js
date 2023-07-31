// hooks/useTimer.js
import { useState, useEffect } from 'react';
import { playBeep } from '../utils/audioUtils';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

export default function useTimer(initialNeedToDoMinutes, initialWantToDoMinutes) {
  const [needToDoTime, setNeedToDoTime] = useState((loadFromLocalStorage('needToDoTime') || initialNeedToDoMinutes) * 60);
  const [wantToDoTime, setWantToDoTime] = useState((loadFromLocalStorage('wantToDoTime') || initialWantToDoMinutes) * 60);
  const [timeLeft, setTimeLeft] = useState(loadFromLocalStorage('timeLeft') || needToDoTime);
  const [isNeedToDoTime, setIsNeedToDoTime] = useState(true);
  const [isRunning, setIsRunning] = useState(loadFromLocalStorage('isRunning') || false);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsNeedToDoTime(!isNeedToDoTime);
      setTimeLeft(isNeedToDoTime ? wantToDoTime : needToDoTime);
      playBeep();
    }
    saveToLocalStorage('timeLeft', timeLeft);
    saveToLocalStorage('isRunning', isRunning);
  }, [timeLeft, isNeedToDoTime, needToDoTime, wantToDoTime, isRunning]);

  useEffect(() => {
    let timerId;
  
    if (isRunning) {
      timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            setIsNeedToDoTime(!isNeedToDoTime);
            return isNeedToDoTime ? wantToDoTime : needToDoTime;
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);
    }
  
    return () => clearInterval(timerId);
  }, [isNeedToDoTime, isRunning, needToDoTime, wantToDoTime]);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      playBeep();
    }
  };

  const stop = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

 const reset = (isNeedToDoTime) => {
    setTimeLeft(isNeedToDoTime ? needToDoTime : wantToDoTime);
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
    switchTimer
  };
}
