import React, { useContext } from 'react';
import { useTimeContext } from '../context/TimeContext';
import {formatTimeSpent} from '../utils/timeUtils'


function Insights() {
  // Destructure the time data from TimeContext
  const { productiveTime, passionTime, leisureTime } = useTimeContext();

  return (
    <div className="theme-bg-darker theme-text-dark">
      <header className="text-center padding-small">
        <h1>Day Summary / Insights</h1>
      </header>
      <div className="container mx-auto max-w-5xl">
        <div className="gap-4 padding-small ">
          <div className="theme-bg-dark border-radius-medium p-4">
            <h2>Productive Time</h2>
            <p>{formatTimeSpent(productiveTime * 60)}</p>
          </div>
        </div>
        <div className="gap-4 padding-small">
          <div className="theme-bg-dark border-radius-medium p-4">
            <h2>Passion Time</h2>
            <p>{formatTimeSpent(passionTime * 60)}</p>
          </div>
        </div>
        <div className="gap-4 padding-small">
          <div className="theme-bg-dark border-radius-medium p-4">
            <h2>Leisure Time</h2>
            <p>{formatTimeSpent(leisureTime * 60)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insights;
