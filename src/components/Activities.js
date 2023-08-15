import React, { useState, useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useActivities } from '../hooks/useActivities';
import { useTimeTracking } from '../hooks/useTimeTracking'; // Import the useTimeTracking hook
import { TasksContext } from '../context/TasksContext';
import { useDeselectIfNotTracking } from '../hooks/useDeselectIfNotTracking';
import { IconButton } from './IconButton';
import ItemInput from './ItemInput';

function Activity({ activity, onDelete, timeTracking }) {
  const { isTrackingMode } = useContext(TasksContext);
  const { isItemSelected, toggleSelection, deselectItem } = timeTracking    ;

  const isSelected = isItemSelected(activity);



  useDeselectIfNotTracking(isTrackingMode, activity, isItemSelected, deselectItem);


  const handleClick = () => {
    if (isTrackingMode) toggleSelection(activity);
  };

  return (
    <div onClick={handleClick} className={`flex items-center mb-2 item-container ${isSelected ? 'selected-item' : ''}`}>
      <div className="theme-text-dark">{activity.name}</div>
      <IconButton onClick={() => onDelete(activity.id)} hoverClassName="hover:text-red-500">
        <AiOutlineDelete />
      </IconButton>
    </div>
  );
}

export default function Activities() {
  const { activities, addActivity, removeActivity } = useActivities();
  const [newActivity, setNewActivity] = useState('');
  const timeTracking = useTimeTracking(); // Initialize the useTimeTracking hook

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
      {activities.map((activity) => (
        <Activity key={activity.id} activity={activity} onDelete={removeActivity} timeTracking={timeTracking} />
      ))}
    </div>
  );
}
