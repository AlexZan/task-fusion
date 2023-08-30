  import React, { useState } from 'react';
  import { FaCog, FaExchangeAlt, FaQuestionCircle } from 'react-icons/fa';

  import ConfigModal from './ConfigModal';
  import TimerDisplayControl from './TimerDisplayControl';
  import { useTasksContext } from '../context/TasksContext';
  import { useTimeContext } from '../context/TimeContext';

  function Timer() {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [isInfoPanelOpen, setInfoPanelOpen] = useState(false);
    const [isAlertPanelOpen, setAlertPanelOpen] = useState(false);

    const { getCurrentTask  } = useTasksContext();
    const {
      isProductivityTime,
      needToDoTime,
      wantToDoTime,
      setNeedToDoTime,
      setWantToDoTime,
      timeLeft,
      start,
      stop,
      reset,
      isRunning,
      switchTimer,
      selectedEnjoymentItem,
    } = useTimeContext();

    //todo no need
    const currentTask = getCurrentTask();

    const handleStart = () => {
      if (!isProductivityTime && !selectedEnjoymentItem?.id) {
        setAlertPanelOpen(true);
        return;
      }
      start();
    };

    const handleClose = () => {
      setIsConfigOpen(false);
    };

    const minutes = timeLeft >= 0 ? Math.floor(timeLeft / 60) : Math.ceil(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
      <div className="text-center p-4 dark:bg-gray-800 rounded-lg mb-2 relative">
        <div className="flex items-center justify-between">
          <button onClick={() => setInfoPanelOpen((prevState) => !prevState)} className="text-gray-500 hover:text-blue-500 transition-colors duration-300">
            <FaQuestionCircle />
          </button>
          <button onClick={() => setIsConfigOpen(true)} className="text-gray-500 hover:text-gray-700 transition-colors duration-300">
            <FaCog />
          </button>
        </div>

        <h2 className="text-2xl">{isProductivityTime ? 'Productivity' : 'Enjoyment'}</h2>
        {isProductivityTime && <h3 className="text-xl text-gray-600">{currentTask ? currentTask.name : 'No task selected'}</h3>}

        <TimerDisplayControl minutes={minutes} seconds={seconds} start={handleStart} stop={stop} reset={reset} isRunning={isRunning} />
        <button onClick={switchTimer} className="mt-4 text-gray-500 hover:text-blue-500 transition-colors duration-200">
          <FaExchangeAlt />
        </button>
        <ConfigModal isOpen={isConfigOpen} onClose={handleClose} needToDoTime={needToDoTime} wantToDoTime={wantToDoTime} setNeedToDoTime={setNeedToDoTime} setWantToDoTime={setWantToDoTime} />
        {isInfoPanelOpen && (
          <div className="bg-blue-300 border border-blue-900 text-blue-900 px-4 py-3 rounded-md shadow-md" role="alert">
            {isProductivityTime ? (
              <>
                <p className="font-bold">What is Productivity Mode?</p>
                <p className="text-sm">For focused work sessions. You will automatically start work on the task at the top; with the highest priority.</p>
              </>
            ) : (
              <>
                <p className="font-bold">What is Enjoyment Mode?</p>
                <p className="text-sm">For leisure activities, or tasks you are passionate about. Unlike Productivity mode, you can choose any task or activity and its time will be tracked.</p>
              </>
            )}
          </div>
        )}
        {isAlertPanelOpen && (
        <div className="bg-red-300 border border-red-900 text-red-900 px-4 py-3 rounded-md shadow-md" role="alert">
          <p className="font-bold">Please Select an Activity</p>
          <p className="text-sm">You need to select an activity or task in "Enjoyment" mode to start the timer.</p>
        </div>
      )}
      </div>
    );
  }

  export default Timer;
