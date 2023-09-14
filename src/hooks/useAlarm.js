import { useRef, useState } from 'react';
import { playBeep } from '../utils/audioUtils';

export const useAlarm = () => {
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const beepIntervalRef = useRef(null);
  

  const startContinuousAlarm = () => {
    if (isAlarmPlaying) return;

    setIsAlarmPlaying(true);

    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
    }

    playBeep();

    // Set up an interval to play the beep sound repeatedly
    const intervalId = setInterval(() => {
      if (beepIntervalRef.current !== intervalId) {
        console.log("Another interval detected! Clearing...");
      }
      playBeep();
    }, 2000); // Repeat every 2 seconds
    
    beepIntervalRef.current = intervalId;
  };

  const stopContinuousAlarm = () => {
    console.log(isAlarmPlaying)
    if (!isAlarmPlaying) return;

    setIsAlarmPlaying(false);

    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
      beepIntervalRef.current = null;
    }
  };

  return {
    isAlarmPlaying,
    startContinuousAlarm,
    stopContinuousAlarm,
  };
};
