import React from 'react';
import useTime from '../hooks/useTime';
import { formatTimeSpent } from '../utils/timeUtils'
import TimeSpentPieChart from './TimeSpentPieChart';

function Insights() {
  // Destructure the time data from TimeContext
  const { productiveTime, passionTime, leisureTime, resetDailyInsights } = useTime();

  const descriptionClass = "text-gray-500 text-sm";

  const data = [
    { name: 'Productive Time', value: productiveTime * 60 },
    { name: 'Passion Time', value: passionTime * 60 },
    { name: 'Leisure Time', value: leisureTime * 60 }
  ];

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
        <div className="gap-4 padding-small">
          <div className="theme-bg-dark border-radius-medium p-4">
            <h2>Time Spent Breakdown</h2>
            <TimeSpentPieChart data={data} />
          </div>
        </div>
        <div className="gap-4 padding-small">
          <button onClick={resetDailyInsights} className="bg-blue-500 text-white px-4 py-2 rounded">
            Reset Insights
          </button>
        </div>

      </div>
    </div>
  );
}

export default Insights;
