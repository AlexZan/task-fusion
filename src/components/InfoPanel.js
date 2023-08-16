import React from 'react';
import { FaClock } from 'react-icons/fa';

import { formatTimeSpent } from '../utils/timeUtils';


function InfoPanel({ isOpen, task }) {
  if (!task) return null;

  return (
    <div className={`info-container ${isOpen ? 'open' : ''}`}>
        <div className="flex items-center">
          <FaClock size={14} className="text-white" />
          <span className="text-white ml-2">{formatTimeSpent(task.timeSpent * 60)}</span>
        </div>
    </div>
  );
}

export default InfoPanel;
