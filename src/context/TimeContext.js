import React, { createContext, useContext, useState } from 'react';

const TimeContext = createContext();

export const useTimeContext = () => {
  return useContext(TimeContext);
};

export const TimeProvider = ({ children }) => {
  // State to manage the selected item during the enjoyment timer
  const [selectedItem, setSelectedItem] = useState({ id: null, type: null });

  const [isProductivityTime, setIsProductivityTime] = useState(true);

  const selectTask = (taskId) => {
    setSelectedItem({ id: taskId, type: 'task' });
};

const selectActivity = (activityId) => {
    setSelectedItem({ id: activityId, type: 'activity' });
};

  // Function to clear the selected item
  const clearSelectedItem = () => {
    setSelectedItem(null);
  };

  return (
    <TimeContext.Provider
      value={{
        selectedItem,
        selectTask,
        selectActivity,
        clearSelectedItem,
        isProductivityTime,
        setIsProductivityTime,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};
