// useDeselectIfNotTracking.js
import { useEffect, useCallback } from 'react';

export const useDeselectIfNotTracking = (isTrackingMode, item, isItemSelected, deselectItem) => {
  const deselectIfNotTracking = useCallback(() => {
    if (!isTrackingMode && isItemSelected(item)) {
      deselectItem(item);
    }
  }, [isTrackingMode, isItemSelected, item, deselectItem]);

  useEffect(() => {
    deselectIfNotTracking();
  }, [deselectIfNotTracking]);
};
