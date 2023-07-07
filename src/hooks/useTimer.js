import { useState, useEffect } from 'react';
import { playBeep } from '../utils/audioUtils';
import { loadFromLocalStorage } from '../utils/localStorage';

export default function useTimer(initialWantToDoTime, initialNeedToDoTime) {
  const [needToDoTime, setNeedToDoTime] = useState((loadFromLocalStorage('needToDoTime') || initialNeedToDoTime) * 60);
  const [wantToDoTime, setWantToDoTime] = useState((loadFromLocalStorage('wantToDoTime') || initialWantToDoTime) * 60);
  const [timeLeft, setTimeLeft] = useState(wantToDoTime);
  const [isNeedToDoTime, setIsNeedToDoTime] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      playBeep();
    }
  }, [isNeedToDoTime, isRunning]);

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

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(isNeedToDoTime ? needToDoTime : wantToDoTime);
  };

  return {
    needToDoTime,
    wantToDoTime,
    timeLeft,
    isNeedToDoTime,
    isRunning,
    setNeedToDoTime,
    setWantToDoTime,
    start,
    stop,
    reset
  };
}
