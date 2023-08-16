import React from 'react';
import { FaClock } from 'react-icons/fa';

import { formatTimeSpent } from '../utils/timeUtils';


function InfoPanel({ isOpen, item }) {
  if (!item) return null;

  console.log('here', item.name)
  return (
    <div className={`info-container ${isOpen ? 'open' : ''}`}>
        <div className="flex items-center">
          <FaClock size={14} className="text-white" />
          <span className="text-white ml-2">{formatTimeSpent(item.timeSpent * 60)}</span>
        </div>
    </div>
  );
}

export default InfoPanel;
