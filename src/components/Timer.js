import React, { useState } from 'react';
import ConfigModal from './ConfigModal';
import TimerDisplayControl from './TimerDisplayControl';
import useTimer from '../hooks/useTimer';
import { FaCog, FaExchangeAlt } from 'react-icons/fa';
import { useTasksContext } from '../context/TasksContext';
import { useTimeContext } from '../context/TimeContext';


function Timer() {

  const { getCurrentTask, updateTaskTimeSpent } = useTasksContext();
  const { isProductivityTime, setIsProductivityTime } = useTimeContext();

  const currentTask = getCurrentTask();

  const updateTimeSpentOnTask = (elapsedTime) => {
    if (!isProductivityTime) return;

    updateTaskTimeSpent(currentTask.id, elapsedTime / 60);
  };

  const {
    needToDoTime,
    wantToDoTime,
    timeLeft,
    setNeedToDoTime,
    setWantToDoTime,
    start,
    stop,
    reset,
    isRunning,
    switchTimer
  } = useTimer(20, 40, updateTimeSpentOnTask);

  const [isConfigOpen, setIsConfigOpen] = useState(false);


  const handleConfigOpen = () => {
    setIsConfigOpen(true);
  };

  const handleClose = () => {
    setIsConfigOpen(false);
    reset();
  };


  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-center p-4 dark:bg-gray-800 rounded-lg mb-2   relative">
      <button onClick={handleConfigOpen} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200"><FaCog /></button>
      <h2 className="text-2xl">{isProductivityTime ? 'Productivity' : 'Enjoyment'}</h2>
      {isProductivityTime && <h3 className="text-xl text-gray-600">{currentTask ? currentTask.name : 'No task selected'}</h3>}

      <TimerDisplayControl
        minutes={minutes}
        seconds={seconds}
        start={start}
        stop={stop}
        reset={reset}
        isRunning={isRunning}
      />
      <button onClick={switchTimer} className="mt-4 text-gray-500 hover:text-blue-500 transition-colors duration-200"><FaExchangeAlt /></button>
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

export default Timer;
