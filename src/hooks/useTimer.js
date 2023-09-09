import { useEffect } from 'react';
import useTime from './useTime';
import useActiveTasks from './useActiveTasks';
import { useActivities } from './useActivities';

function useTimer() {
  const {
    timeLeft,
    updateTimeLeft,
    isRunning,
    setTimerRunning,
    isProductivity,
    toggleTimerProductivity,
    selectedEnjoymentItem,
    updateSelectedEnjoymentItem,
    isAlarmPlaying,
    toggleTimerAlarmPlaying,
    addProductiveTime,
    addPassionTime,
    addLeisureTime,
    productivityTime,
    enjoymentTime,
  } = useTime();

  const { handleUpdateTopTaskTimeSpent, updateTaskTimeSpent } = useActiveTasks();
  const { updateActivityTimeSpent } = useActivities();

  // Helper function to determine if timer has finished
  const isFinished = () => timeLeft <= 0;

  const startContinuousAlarm = () => {
    // logic to start alarm
    toggleTimerAlarmPlaying();
  };

  useEffect(() => {
    if (!isRunning) return;

    if (isFinished() && !isAlarmPlaying) {
      startContinuousAlarm();
    }

    let lastUpdateTime = Date.now();

    const tickFunction = () => {
      const currentTime = Date.now();
      const elapsedSeconds = Math.floor((currentTime - lastUpdateTime) / 1000);

      const elapsedMinutes = elapsedSeconds / 60;

      if (!isProductivity && selectedEnjoymentItem) {

        if (selectedEnjoymentItem.type === 'task') {
          addPassionTime(elapsedMinutes);
          updateTaskTimeSpent(selectedEnjoymentItem.id, elapsedMinutes);
        } else if (selectedEnjoymentItem.type === 'activity') {
          addLeisureTime(elapsedMinutes);
          updateActivityTimeSpent(selectedEnjoymentItem.id, elapsedMinutes);
        }
      }

      if (isProductivity) {
        addProductiveTime(elapsedMinutes);
        handleUpdateTopTaskTimeSpent(elapsedMinutes);
      }

      const newTimeLeft = timeLeft - elapsedSeconds;
      updateTimeLeft(newTimeLeft);
      lastUpdateTime = currentTime;
    };

    let intervalId = setInterval(tickFunction, 1000);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(intervalId);
      } else {
        tickFunction();
        intervalId = setInterval(tickFunction, 1000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isRunning, timeLeft, isProductivity, selectedEnjoymentItem, isAlarmPlaying]);

  const start = () => {
    setTimerRunning(true);
  }

  const stop = () => {
    setTimerRunning(false);
  }

  const reset = () => {
    setTimerRunning(false);
    updateTimeLeft(0); // Reset to initialTime if you want a different starting point
  }

  const switchTimer = () => {
    toggleTimerProductivity();
    const newTime = isProductivity ? enjoymentTime : productivityTime; // Please note the inversion here because isProductivityTime hasn't updated yet in this context
    updateTimeLeft(newTime);
    setTimerRunning(false);
  };

  return {
    timeLeft,
    updateTimeLeft,
    isRunning,
    start,
    stop,
    reset,
    toggleTimerProductivity,
    updateSelectedEnjoymentItem,
    switchTimer
  };
}

export default useTimer;
