import React from 'react';
import { useTimeContext } from '../context/TimeContext';
import {formatTimeSpent} from '../utils/timeUtils'


function Insights() {
  // Destructure the time data from TimeContext
  const { productiveTime, passionTime, leisureTime } = useTimeContext();

  const descriptionClass = "text-gray-500 text-sm";

  return (
    <div className="theme-bg-darker theme-text-dark">
      <header className="text-center padding-small">
        <h1>Day Summary / Insights</h1>
      </header>
      <div className="container mx-auto max-w-5xl">
        <div className="gap-4 padding-small">
          <div className="theme-bg-dark border-radius-medium p-4">
            <h2>Productive Time</h2>
            <p>{formatTimeSpent(productiveTime * 60)}</p>
            <small className={descriptionClass}>
              This time represents the amount of time you've spent completing
              your priority tasks. It's time well spent toward achieving your goals.
            </small>
          </div>
        </div>
        <div className="gap-4 padding-small">
          <div className="theme-bg-dark border-radius-medium p-4">
            <h2>Passion Time</h2>
            <p>{formatTimeSpent(passionTime * 60)}</p>
            <small className={descriptionClass}>
              This is the time you've spent on tasks that you're passionate about
              during your 'Enjoyment' time. It's a blend of productivity and joy.
            </small>
          </div>
        </div>
        <div className="gap-4 padding-small">
          <div className="theme-bg-dark border-radius-medium p-4">
            <h2>Leisure Time</h2>
            <p>{formatTimeSpent(leisureTime * 60)}</p>
            <small className={descriptionClass}>
              This time represents pure leisure activities you've engaged in.
              It's your time to relax and recharge.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Insights;
