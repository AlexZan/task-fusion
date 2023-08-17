import React from 'react';
import { FaPlay, FaStop, FaRedo } from 'react-icons/fa';

function TimerDisplayControl({ minutes, seconds, start, stop, reset, isRunning, disableStart }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl font-bold my-4">
        <div className="inline-block bg-gray-800 rounded-full p-4">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
      </div>
      <div className="flex justify-center items-center space-x-4">
        {isRunning ? (
          <button onClick={stop} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200">
            <FaStop />
          </button>
        ) : (
          <button
          onClick={start}
          disabled={disableStart}
          title={disableStart ? "You are in tracking mode and cannot start the timer." : ""}
          className={`bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors duration-200 ${disableStart ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <FaPlay />
        </button>
        )}
        <button onClick={reset} className="bg-gray-500 text-white p-2 rounded-full hover:bg-gray-600 transition-colors duration-200">
          <FaRedo />
        </button>
      </div>
    </div>
  );
}

export default TimerDisplayControl;
