import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { useActivitiesContext } from '../context/ActivitiesContext';
import { useTimeContext } from '../context/TimeContext';

import { IconButton } from './IconButton';
import ItemInput from './ItemInput';
import InfoPanel from './InfoPanel';

function Activity({ activity, onDelete, index }) {
  const [isInfoOpen, setInfoOpen] = React.useState(false);

  const { selectedItem, selectActivity, isProductivityTime } = useTimeContext();
  
  //set default selection if none
  useEffect(() => {
    if (index === 0 && !selectedItem.id) {
      selectActivity(activity.id);
    }
  }, [index, selectedItem, activity, selectActivity]);

  const handleSelection = (activity) => {
    if (isProductivityTime) return;

    selectActivity(activity.id);
  };

  const handleInfoClick = () => {
    setInfoOpen(!isInfoOpen);
  };

  const isSelected = (activity) => !isProductivityTime && selectedItem?.id === activity.id && selectedItem?.type === "activity";

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
      {activities.map((activity,index) => (
        <Activity key={activity.id} index={index} activity={activity} onDelete={removeActivity} />
      ))}
    </div>
  );
}
