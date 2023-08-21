import { useState, useEffect, useCallback } from 'react';

import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { useAlarm } from './useAlarm';
import { useTimeContext } from '../context/TimeContext';
import { useActivitiesContext } from '../context/ActivitiesContext'
import { useTasksContext } from '../context/TasksContext';

import {
  startTimerInServiceWorker,
  stopTimerInServiceWorker,
  resetTimerInServiceWorker,
} from '../utils/serviceWorkerUtils';

export default function useTimer(initialNeedToDoMinutes, initialWantToDoMinutes, onTick) {
  const [needToDoTime, setNeedToDoTime] = useState((loadFromLocalStorage('needToDoTime') || initialNeedToDoMinutes) * 60);
  const [wantToDoTime, setWantToDoTime] = useState((loadFromLocalStorage('wantToDoTime') || initialWantToDoMinutes) * 60);

  const { isProductivityTime, setIsProductivityTime, selectedItem } = useTimeContext();
  const { updateActivityTimeSpent } = useActivitiesContext();
  const { updateTaskTimeSpent } = useTasksContext();

  const [timeLeft, setTimeLeft] = useState(
    loadFromLocalStorage('timeLeft') || (isProductivityTime ? needToDoTime : wantToDoTime)
  );
  const [isRunning, setIsRunning] = useState(loadFromLocalStorage('isRunning') || false);

  const { isAlarmPlaying, startContinuousAlarm, stopContinuousAlarm } = useAlarm();

  const isFinished = useCallback(() => timeLeft <= 0, [timeLeft]);

  const hasProgressed = () => {
    const initialTime = isProductivityTime ? needToDoTime : wantToDoTime;
    console.log("timeleft", timeLeft, "initialtime:", initialTime, timeLeft !== initialTime)
    return isRunning || timeLeft !== initialTime;
  };

  useEffect(() => {
    saveToLocalStorage('timeLeft', timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (!isRunning) return;

    if (isFinished() && !isAlarmPlaying) {
      startContinuousAlarm();
  }
  

    let lastUpdateTime = Date.now();

    const tick = () => {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - lastUpdateTime) / 1000);

      if (!isProductivityTime) {
        if (selectedItem.type === 'task') {
          updateTaskTimeSpent(selectedItem.id, elapsedSeconds / 60);
        } else if (selectedItem.type === 'activity') {
          updateActivityTimeSpent(selectedItem.id, elapsedSeconds / 60);
        }
      }

      if (onTick) onTick(elapsedSeconds);
      const newTimeLeft = timeLeft - elapsedSeconds;
      setTimeLeft(newTimeLeft);
      lastUpdateTime = currentTime;
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
  }, [isRunning, timeLeft, isProductivityTime, isFinished, startContinuousAlarm, onTick, selectedItem, updateActivityTimeSpent, updateTaskTimeSpent, isAlarmPlaying]);

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
    const newTime = isProductivityTime ? needToDoTime : wantToDoTime;
    setTimeLeft(newTime);
    setIsRunning(false);
    resetTimerInServiceWorker();
  }, [isProductivityTime, needToDoTime, wantToDoTime]);



  const switchTimer = useCallback(() => {
    // Toggle the value of isProductivityTime
    const newIsProductivityTime = !isProductivityTime;
    setIsProductivityTime(newIsProductivityTime);

    // Set the time based on the new value of isProductivityTime
    const newTime = newIsProductivityTime ? needToDoTime : wantToDoTime;
    setTimeLeft(newTime);
    setIsRunning(false);
    resetTimerInServiceWorker();
  }, [isProductivityTime, needToDoTime, wantToDoTime, setIsProductivityTime]);



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

