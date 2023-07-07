// components/TaskTimer.js
import React, { useState } from 'react';
import ConfigModal from './ConfigModal';
import TaskTimerDisplayControl from './TaskTimerDisplayControl';
import useTimer from '../hooks/useTimer';
import { FaCog } from 'react-icons/fa';

function TaskTimer() {
  const {
    needToDoTime,
    wantToDoTime,
    timeLeft,
    isNeedToDoTime,
    setNeedToDoTime,
    setWantToDoTime,
    start,
    stop,
    reset,
    isRunning
  } = useTimer(40, 20);

  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const handleConfigOpen = () => {
    setIsConfigOpen(true);
  };

  const handleConfigClose = () => {
    setIsConfigOpen(false);
  };

  const handleConfigConfirm = (e) => {
    e.preventDefault();
    setIsConfigOpen(false);
    reset(); // Reset the timer when the times are updated
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center p-4 dark:bg-gray-800 rounded-lg mb-4 relative">
      <button onClick={handleConfigOpen} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"><FaCog /></button>
      <h2 className="text-2xl">{isNeedToDoTime ? 'Need To Do Time' : 'Want To Do Time'}</h2>
      <TaskTimerDisplayControl
        minutes={minutes}
        seconds={seconds}
        start={start}
        stop={stop}
        reset={reset}
        isRunning={isRunning}
      />
      <ConfigModal
        isOpen={isConfigOpen}
        onRequestClose={handleConfigClose}
        onConfirm={handleConfigConfirm}
        needToDoTime={needToDoTime}
        wantToDoTime={wantToDoTime}
        setNeedToDoTime={setNeedToDoTime}
        setWantToDoTime={setWantToDoTime}
      />
    </div>
  );
}

export default TaskTimer;
