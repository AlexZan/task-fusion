import React, { useState } from 'react';
import ConfigModal from './ConfigModal';
import TaskTimerDisplayControl from './TaskTimerDisplayControl';
import useTimer from '../hooks/useTimer';
import { FaCog, FaExchangeAlt } from 'react-icons/fa';
import { useTasksContext } from '../context/TasksContext';

function TaskTimer() {
  const [startTime, setStartTime] = useState(null);

  const { getCurrentTask, enterTrackingMode, exitTrackingMode, isTrackingMode, updateTimeSpent } = useTasksContext();
  const currentTask = getCurrentTask();


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
    isRunning,
    switchTimer
  } = useTimer(20, 40);

  const [isConfigOpen, setIsConfigOpen] = useState(false);


  const handleConfigOpen = () => {
    setIsConfigOpen(true);
  };

  const handleClose = () => {
    setIsConfigOpen(false);
    reset();
  };

  const handleStart = () => {
    setStartTime(new Date());
    start();
  };

  const handleStop = () => {
    updateTimeSpentOnTask();
    stop();
    if (!isNeedToDoTime) {
      enterTrackingMode();
    }
  };
  
  const updateTimeSpentOnTask = () => {
    if (startTime) {
      const endTime = new Date();
      const timeSpent = (endTime - startTime) / 1000 / 60; // Time in minutes
      updateTimeSpent(currentTask, timeSpent);
      setStartTime(null); // Reset the start time
    }
  };


  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center p-4 dark:bg-gray-800 rounded-lg mb-2   relative">
      <button onClick={handleConfigOpen} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"><FaCog /></button>
      <h2 className="text-2xl">{isNeedToDoTime ? 'Productivity' : 'Enjoyment'}</h2>
      <h3 className="text-xl text-gray-500">working on: {currentTask ? currentTask.name : 'No task selected'}</h3>

      <TaskTimerDisplayControl
        minutes={minutes}
        seconds={seconds}
        start={handleStart}
        stop={handleStop}
        reset={reset}
        isRunning={isRunning}
        disableStart={isTrackingMode}
      />
      <button onClick={switchTimer} className="mt-4 text-gray-500 hover:text-blue-500 transition-colors duration-200"><FaExchangeAlt /></button>
      {isTrackingMode && (
        <div className="mt-6">
          <button
            onClick={exitTrackingMode}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 font-bold"
          >
            Exit Tracking Mode
          </button>
        </div>
      )}
      <ConfigModal
        isOpen={isConfigOpen}
        onClose={handleClose}
        needToDoTime={needToDoTime}
        wantToDoTime={wantToDoTime}
        setNeedToDoTime={setNeedToDoTime}
        setWantToDoTime={setWantToDoTime}
      />
    </div>
  );
}

export default TaskTimer;
