// components/TaskTimerDisplayControl.js
import React from 'react';

function TaskTimerDisplayControl({ minutes, seconds, start, stop, reset }) {
  return (
    <>
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
    </>
  );
}

export default TaskTimerDisplayControl;
