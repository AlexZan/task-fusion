import { useState, useEffect } from 'react';
import { playBeep } from '../utils/audioUtils';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

export default function useTimer(initialWorkTime, initialBreakTime) {
  const [workTime, setWorkTime] = useState((loadFromLocalStorage('workTime') || initialWorkTime) * 60);
  const [breakTime, setBreakTime] = useState((loadFromLocalStorage('breakTime') || initialBreakTime) * 60);
  const [timeLeft, setTimeLeft] = useState(workTime);
  const [isWorkTime, setIsWorkTime] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      playBeep();
    }
  }, [isWorkTime, isRunning]);

  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            setIsWorkTime(!isWorkTime);
            return isWorkTime ? breakTime : workTime;
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [isWorkTime, isRunning, workTime, breakTime]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(isWorkTime ? workTime : breakTime);
  };

  return {
    workTime,
    breakTime,
    timeLeft,
    isWorkTime,
    isRunning,
    setWorkTime,
    setBreakTime,
    start,
    stop,
    reset
  };
}
