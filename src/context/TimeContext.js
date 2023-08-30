import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';
import { useAlarm } from '../hooks/useAlarm';
import {
  startTimerInServiceWorker,
  stopTimerInServiceWorker,
  resetTimerInServiceWorker,
} from '../utils/serviceWorkerUtils';


const TASK = 'task';
const ACTIVITY = 'activity';

const TimeContext = createContext();

export const useTimeContext = () => {
  return useContext(TimeContext);
};

export const TimeProvider = ({ children, initialNeedToDoMinutes = 20, initialWantToDoMinutes = 40 }) => {
  // Existing states
  const [selectedEnjoymentItem, setSelectedEnjoymentItem] = useState({ id: null, type: null });
  const [enjoymentTickHandler, setEnjoymentTickHandler] = useState(null);
  const [isProductivityTime, setIsProductivityTime] = useState(loadFromLocalStorage('isProductivityTime') !== null ? loadFromLocalStorage('isProductivityTime') : true);
  const [productiveTime, setProductiveTime] = useState(loadFromLocalStorage('productiveTime') || 0);
  const [passionTime, setPassionTime] = useState(loadFromLocalStorage('passionTime') || 0);
  const [leisureTime, setLeisureTime] = useState(loadFromLocalStorage('leisureTime') || 0);
  

  // States moved from useTimer
  const [needToDoTime, setNeedToDoTime] = useState((loadFromLocalStorage('needToDoTime') || initialNeedToDoMinutes) * 60);
  const [wantToDoTime, setWantToDoTime] = useState((loadFromLocalStorage('wantToDoTime') || initialWantToDoMinutes) * 60);
  const [timeLeft, setTimeLeft] = useState(loadFromLocalStorage('timeLeft') || (isProductivityTime ? needToDoTime : wantToDoTime));
  const [isRunning, setIsRunning] = useState(loadFromLocalStorage('isRunning') || false);

  const { isAlarmPlaying, startContinuousAlarm, stopContinuousAlarm } = useAlarm();

  const isFinished = useCallback(() => timeLeft <= 0, [timeLeft]);

  const productivityTickHandlerRef = useRef(null);

  const setProductivityTickFunction = useCallback((handler) => {
    productivityTickHandlerRef.current = handler;
  }, []);

  const selectEnjoymentItem = (item, handler) => {
    setSelectedEnjoymentItem(item);
    setEnjoymentTickHandler(() => handler);
  };

  const increaseProductiveTime = (timeIncrement) => {
    setProductiveTime((prevTime) => prevTime + timeIncrement);
  };
  
  const increasePassionTime = (timeIncrement) => {
    setPassionTime((prevTime) => prevTime + timeIncrement);
  };
  
  const increaseLeisureTime = (timeIncrement) => {
    setLeisureTime((prevTime) => prevTime + timeIncrement);
  };

  const resetDailyInsights = () => {
    setProductiveTime(0);
    setPassionTime(0);
    setLeisureTime(0);
  };

    // Save to localStorage whenever time changes
    useEffect(() => {
      saveToLocalStorage('productiveTime', productiveTime);
    }, [productiveTime]);
  
    useEffect(() => {
      saveToLocalStorage('passionTime', passionTime);
    }, [passionTime]);
  
    useEffect(() => {
      saveToLocalStorage('leisureTime', leisureTime);
    }, [leisureTime]);


  useEffect(() => {
    saveToLocalStorage('timeLeft', timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    saveToLocalStorage('isProductivityTime', isProductivityTime);
  }, [isProductivityTime]);

  useEffect(() => {
    if (!isRunning) return;

    if (isFinished() && !isAlarmPlaying) {
      startContinuousAlarm();
    }

    let lastUpdateTime = Date.now();

    const tick = () => {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - lastUpdateTime) / 1000);
  
      if (!isProductivityTime && selectedEnjoymentItem && enjoymentTickHandler) {
        enjoymentTickHandler(elapsedSeconds / 60);

        if (selectedEnjoymentItem.type === TASK) {
          increasePassionTime(elapsedSeconds / 60);
        } else if (selectedEnjoymentItem.type === ACTIVITY) {
          increaseLeisureTime(elapsedSeconds / 60);
        }
      }

      if (isProductivityTime && productivityTickHandlerRef.current) {
        productivityTickHandlerRef.current(elapsedSeconds / 60);
        increaseProductiveTime(elapsedSeconds / 60);
      }
  
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
  }, [isRunning, timeLeft, isProductivityTime, isFinished, startContinuousAlarm, selectedEnjoymentItem, isAlarmPlaying, enjoymentTickHandler]);

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
    const newIsProductivityTime = !isProductivityTime;
    setIsProductivityTime(newIsProductivityTime);
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
      if (isFinished()) {
        switchTimer();
      }
    }
  }, [isRunning, isFinished, switchTimer, stopContinuousAlarm]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'timerFinished') {
        stop();
      }
    };
    navigator.serviceWorker.addEventListener('message', handleMessage);
    return () => {
      navigator.serviceWorker.removeEventListener('message', handleMessage);
    };
  }, [stop]);

  const value = {
    selectedEnjoymentItem,
    selectEnjoymentItem,
    clearSelectedItem: () => setSelectedEnjoymentItem(null),
    isProductivityTime,
    setIsProductivityTime,
    needToDoTime,
    setNeedToDoTime,
    wantToDoTime,
    setWantToDoTime,
    timeLeft,
    setTimeLeft,
    isRunning,
    setIsRunning,
    start,
    stop,
    reset,
    switchTimer,
    setProductivityTickFunction,
    productiveTime,
    leisureTime,
    passionTime,
    resetDailyInsights
  };

  return (
    <TimeContext.Provider value={value}>
      {children}
    </TimeContext.Provider>
  );
};
