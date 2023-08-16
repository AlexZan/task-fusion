import React, { useState } from 'react';
import { AiOutlineDelete, AiOutlineInfoCircle } from 'react-icons/ai';
import { useActivitiesContext } from '../context/ActivitiesContext';
import { IconButton } from './IconButton';
import ItemInput from './ItemInput';
import InfoPanel from './InfoPanel';

function Activity({ activity, onDelete}) {
  const [isInfoOpen, setInfoOpen] = React.useState(false);

  const handleInfoClick = () => {
    setInfoOpen(!isInfoOpen);
  };

  return (
    <div>
      <div className={`flex items-center item-container`}>
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
  const { activities, addActivity, removeActivity } = useActivitiesContext();
  const [newActivity, setNewActivity] = useState('');

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
        <Activity key={activity.id} activity={activity} onDelete={removeActivity} />
      ))}
    </div>
  );
}
