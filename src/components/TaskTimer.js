import React, { useState, useEffect } from 'react';
import { playBeep } from '../utils/audioUtils';

const NEED_TO_DURATION = 2; // 2 seconds for testing
const LIKE_TO_DURATION = 5; // 5 seconds for testing

function TaskTimer() {
  const [timeLeft, setTimeLeft] = useState(LIKE_TO_DURATION);
  const [isNeedTo, setIsNeedTo] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  

  useEffect(() => {
    if (isRunning) {
      playBeep();
    }
  }, [isNeedTo, isRunning]);
  
  
  
  
  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 0) {
            setIsNeedTo(!isNeedTo);
            return isNeedTo ? LIKE_TO_DURATION : NEED_TO_DURATION;
          } else {
            return prevTimeLeft - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [isNeedTo, isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(isNeedTo ? NEED_TO_DURATION : LIKE_TO_DURATION);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center p-4 dark:bg-gray-800 rounded-lg mb-4">
      <h2 className="text-2xl">{isNeedTo ? 'Need To' : 'Like To'}</h2>
      <div className="text-6xl font-bold my-4">
        <div className="inline-block bg-gray-800 rounded-full p-4">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="flex justify-between">
        <button onClick={start} className="bg-gray-500 text-white p-2 rounded-md w-1/3 mr-2">Start</button>
        <button onClick={stop} className="bg-gray-500 text-white p-2 rounded-md w-1/3 mr-2">Stop</button>
        <button onClick={reset} className="bg-gray-500 text-white p-2 rounded-md w-1/3">Reset</button>
      </div>
    </div>
  );
}

export default TaskTimer;
