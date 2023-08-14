import { useState } from 'react';

export const useTimeTracking = () => {
    const [selectedItems, setSelectedItems] = useState([]);
  
    const toggleSelection = (item) => {
      if (selectedItems.includes(item)) {
        setSelectedItems(selectedItems.filter((i) => i !== item));
      } else {
        setSelectedItems([...selectedItems, item]);
      }
    };

    const deselectItem = (item) => {
        setSelectedItems(selectedItems.filter((i) => i !== item));
      };
  
    const clearSelection = () => {
      setSelectedItems([]);
    };

    const isItemSelected = (item) => {
        return selectedItems.includes(item);
      };
  
    const startTracking = (item) => {
      // Logic to start tracking time for a specific item
    };
  
    const stopTracking = (item) => {
      // Logic to stop tracking time for a specific item
    };
  
    return {
      selectedItems,
      toggleSelection,
      clearSelection,
      startTracking,
      stopTracking,
      deselectItem,
      isItemSelected
    };
  }
  