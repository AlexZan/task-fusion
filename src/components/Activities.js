import React, { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useActivities } from '../hooks/useActivities';
import { IconButton } from './IconButton';
import ItemInput from './ItemInput'; // Import the ItemInput component

function Activity({ activity, onDelete }) {
    return (
        <div className="activity-container flex justify-between items-center">
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
    const [isHovered, setIsHovered] = useState(false);

    const handleActivityKeyPress = (e) => {
        if (e.key === 'Enter' && newActivity.trim() !== '') {
            addActivity(newActivity);
            setNewActivity('');
        }
    };

    return (
        <div className="padding-medium relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <h2 className="text-2xl font-semibold mb-4 theme-text-dark">Activities</h2>
            <ItemInput
                isOpen={isHovered}
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
