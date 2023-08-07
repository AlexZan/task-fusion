import { useRef, useState } from 'react';
import { playBeep } from '../utils/audioUtils';

export const useAlarm = () => {
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const beepIntervalRef = useRef(null);

  const startContinuousAlarm = () => {
    setIsAlarmPlaying(true);

    // Clear existing interval if any
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
    }

    playBeep();

    // Set up an interval to play the beep sound repeatedly
    beepIntervalRef.current = setInterval(() => {
      playBeep();
    }, 2000); // Repeat every 2 seconds
  };

  const stopContinuousAlarm = () => {
    if (!isAlarmPlaying) return;

    setIsAlarmPlaying(false);

    // Clear the interval that is playing the beep sound
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
