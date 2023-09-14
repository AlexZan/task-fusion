import useTime from './useTime';
import { useAlarm } from '../hooks/useAlarm';

function useTimer() {
  const {
    timeLeft,
    updateTimeLeft,
    setTimerRunning,
    isProductivity,
    toggleTimerProductivity,
    productivityTime,
    enjoymentTime,
  } = useTime();

  const { stopContinuousAlarm } = useAlarm();

  const isFinished = () => timeLeft <= 0;

  const getCurrentModeTotalTime = () => isProductivity ? productivityTime : enjoymentTime;

  const start = () => {
    setTimerRunning(true);
  }

  const stop = () => {
    setTimerRunning(false);
    stopContinuousAlarm();
    if (isFinished()) {
      switchTimer();
    }
  }

  const reset = () => {
    setTimerRunning(false);
    updateTimeLeft(getCurrentModeTotalTime());
  }

  const switchTimer = () => {
    toggleTimerProductivity();
    const newTime = isProductivity ? enjoymentTime : productivityTime; // Please note the inversion here because isProductivityTime hasn't updated yet in this context
    updateTimeLeft(newTime);
    setTimerRunning(false);
  };

  return {
    updateTimeLeft,
    start,
    stop,
    reset,
    switchTimer,
  };
}

export default useTimer;
