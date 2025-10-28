import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';

import { useActivities } from '../hooks/useActivities'
import useTime from '../hooks/useTime';
import { IconButton } from './IconButton';
import ItemInput from './ItemInput';
import InfoPanel from './InfoPanel';

function Activity({ activity, onDelete }) {
  const [isInfoOpen, setInfoOpen] = React.useState(false);
  const { selectEnjoymentItem, isProductivity, selectedEnjoymentItem } = useTime();
  // const { updateActivityTimeSpent } = useActivities();



  const handleSelection = (activity) => {
    if (isProductivity) return;

    setInfoOpen(true);
    selectEnjoymentItem({ ...activity, type: 'activity' });
  };


  const isSelected = (activity) =>
    !isProductivity && selectedEnjoymentItem?.id === activity.id && selectedEnjoymentItem?.type === 'activity';

  useEffect(() => {
    if (!isSelected(activity)) {
      setInfoOpen(false);
    }
  }, [selectedEnjoymentItem]);

  const handleInfoClick = (event) => {
    event.stopPropagation();
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
      <InfoPanel isOpen={isInfoOpen || isSelected(activity)} item={activity} />
    </div>
  );
}

export default function Activities() {
  const [newActivity, setNewActivity] = useState('');

  const { activities, addActivity, removeActivity, updateActivityTimeSpent } = useActivities();
  const { selectEnjoymentItem, selectedEnjoymentItem } = useTime();

  const hasSetInitialActivityRef = useRef(false);


  const handleActivityKeyPress = (e) => {
    if ((e.key === 'Enter' || e.type === 'submit') && newActivity.trim() !== '') {
      addActivity(newActivity);
      setNewActivity('');
    }
  };

  useEffect(() => {
    if (!hasSetInitialActivityRef.current && activities.length > 0 && !selectedEnjoymentItem?.id) {
      const firstActivity = activities[0];
      selectEnjoymentItem({ ...firstActivity, type: 'activity' }); // use it here

      // Mark that we've set the initial activity so this logic doesn't run again
      hasSetInitialActivityRef.current = true;
    }
  }, [activities, selectedEnjoymentItem, selectEnjoymentItem]);



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
        <Activity key={activity.id} activity={activity} onDelete={removeActivity} />
      ))}
    </div>
  );
}
