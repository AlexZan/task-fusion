import { useState, useEffect, useCallback } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { useAlarm } from './useAlarm';
import {
  startTimerInServiceWorker,
  stopTimerInServiceWorker,
  resetTimerInServiceWorker,
} from '../utils/serviceWorkerUtils';

export default function useTimer(initialNeedToDoMinutes, initialWantToDoMinutes) {
  const [needToDoTime, setNeedToDoTime] = useState((loadFromLocalStorage('needToDoTime') || initialNeedToDoMinutes) * 60);
  const [wantToDoTime, setWantToDoTime] = useState((loadFromLocalStorage('wantToDoTime') || initialWantToDoMinutes) * 60);
  const [isNeedToDoTime, setIsNeedToDoTime] = useState(true);
  const [timeLeft, setTimeLeft] = useState(
    loadFromLocalStorage('timeLeft') || (isNeedToDoTime ? needToDoTime : wantToDoTime)
  );
  const [isRunning, setIsRunning] = useState(loadFromLocalStorage('isRunning') || false);

  const { isAlarmPlaying, startContinuousAlarm, stopContinuousAlarm } = useAlarm();

  const isFinished = useCallback(() => timeLeft === 0, [timeLeft]);

  const hasProgressed = () => {
    const initialTime = isNeedToDoTime ? needToDoTime : wantToDoTime;
    console.log("timeleft", timeLeft, "initialtime:", initialTime, timeLeft !== initialTime)
    return isRunning || timeLeft !== initialTime;
  };

  useEffect(() => {
    saveToLocalStorage('timeLeft', timeLeft);
  }, [timeLeft]);

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

    let intervalId = setInterval(tick, 1000);


    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalId);
      } else {
        tick(); // Adjust timeLeft based on the actual elapsed time
        intervalId = setInterval(tick, 1000); // Restart the interval
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

    if (Notification.permission !== 'granted') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Unable to get permission to notify.');
        }
      });
    }
    
    if (!isRunning) {
      setIsRunning(true);
      startTimerInServiceWorker(timeLeft);
    }
  };
  

  const reset = useCallback(() => {
    const newTime = isNeedToDoTime ? needToDoTime : wantToDoTime;
    setTimeLeft(newTime);
    setIsRunning(false);
    resetTimerInServiceWorker();
  }, [isNeedToDoTime, needToDoTime, wantToDoTime]);



  const switchTimer = useCallback(() => {
    // Toggle the value of isNeedToDoTime
    const newIsNeedToDoTime = !isNeedToDoTime;
    setIsNeedToDoTime(newIsNeedToDoTime);
  
    // Set the time based on the new value of isNeedToDoTime
    const newTime = newIsNeedToDoTime ? needToDoTime : wantToDoTime;
    setTimeLeft(newTime);
    setIsRunning(false);
    resetTimerInServiceWorker();
  }, [isNeedToDoTime, needToDoTime, wantToDoTime]);
  


  const stop = useCallback(() => {
    if (isRunning) {
      setIsRunning(false);
      stopContinuousAlarm();
      stopTimerInServiceWorker();

      // Only switch the timer if it has finished
      if (isFinished()) {
        switchTimer();
      }
    }
  }, [isRunning, isFinished, switchTimer, stopContinuousAlarm]);


  useEffect(() => {
    // Define the message handler
    const handleMessage = (event) => {
      if (event.data === 'timerFinished') {
        stop();
      }
    };

    // Add the message handler
    navigator.serviceWorker.addEventListener('message', handleMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, [stop]);

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

