import React, { createContext, useContext, useState } from 'react';

const TimeContext = createContext();

export const useTimeContext = () => {
  return useContext(TimeContext);
};

export const TimeProvider = ({ children }) => {
  // State to manage the selected item during the enjoyment timer
  const [selectedItem, setSelectedItem] = useState(null);
  const [isProductivityTime, setIsProductivityTime] = useState(true);

  // Function to set the selected item
  const selectItem = (item) => {
    setSelectedItem(item);
  };

  // Function to clear the selected item
  const clearSelectedItem = () => {
    setSelectedItem(null);
  };

  return (
    <TimeContext.Provider
      value={{
        selectedItem,
        selectItem,
        clearSelectedItem,
        isProductivityTime,
        setIsProductivityTime,
      }}
    >
      {children}
    </TimeContext.Provider>
  );
};
