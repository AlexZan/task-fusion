import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';

import { useActivitiesContext } from '../context/ActivitiesContext';
import { useTimeContext } from '../context/TimeContext';

import { IconButton } from './IconButton';
import ItemInput from './ItemInput';
import InfoPanel from './InfoPanel';

function Activity({ activity, onDelete, index }) {
  const [isInfoOpen, setInfoOpen] = React.useState(false);
  const { selectEnjoymentItem, isProductivityTime, selectedEnjoymentItem } = useTimeContext();
  const { updateActivityTimeSpent } = useActivitiesContext();

  //set default selection if none
  useEffect(() => {
    if (index === 0 && !selectedEnjoymentItem?.id) {
      selectEnjoymentItem({ ...activity, type: 'activity' });
    }
  }, [index, selectedEnjoymentItem, activity, selectEnjoymentItem]);

  const handleSelection = (activity) => {
    if (isProductivityTime) return;
    
    // Handler to update the time spent for the selected activity
    const updateTimeSpentHandler = (timeSpent) => {
      updateActivityTimeSpent(activity.id, timeSpent);
    };

    selectEnjoymentItem({ ...activity, type: 'activity' }, updateTimeSpentHandler);
  };

  const isSelected = (activity) => !isProductivityTime && selectedEnjoymentItem?.id === activity.id && selectedEnjoymentItem?.type === 'activity';

  const handleInfoClick = () => {
    setInfoOpen(!isInfoOpen);
  };

  return (
    <div onClick={() => handleSelection(activity)}>
      <div className={`flex items-center item-container ${isSelected(activity) ? 'selected-item' : ''}`}>
        <div className="theme-text-dark">{activity.name}</div>
        <IconButton onClick={handleInfoClick} hoverClassName="hover:text-blue-500">
          <AiOutlineInfoCircle />
        </IconButton>
        <IconButton onClick={() => onDelete(activity.id)} hoverClassName="hover:text-red-500">
          <AiOutlineDelete />
        </IconButton>
      </div>
      <InfoPanel isOpen={isInfoOpen} item={activity} />
    </div>
  );
}

export default function Activities() {
  const [newActivity, setNewActivity] = useState('');

  const { activities, addActivity, removeActivity } = useActivitiesContext();

  const handleActivityKeyPress = (e) => {
    if (e.key === 'Enter' && newActivity.trim() !== '') {
      addActivity(newActivity);
      setNewActivity('');
    }
  };



  return (
    <div className="padding-medium">
      <h2 className="text-2xl font-semibold theme-text-dark">Activities</h2>
      <ItemInput
        isOpen={true}
        value={newActivity}
        onChange={(e) => setNewActivity(e.target.value)}
        onKeyPress={handleActivityKeyPress}
        placeholder="Type a new activity and press Enter"
      />
      {activities.map((activity, index) => (
        <Activity key={activity.id} index={index} activity={activity} onDelete={removeActivity} />
      ))}
    </div>
  );
}
