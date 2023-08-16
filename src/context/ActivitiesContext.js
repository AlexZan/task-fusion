import React, { createContext, useContext } from 'react';
import useActivities from '../hooks/useActivities';

export const ActivitiesContext = createContext();

export function ActivitiesProvider({ children }) {
  const activitiesFunctions = useActivities();

  return (
    <ActivitiesContext.Provider value={activitiesFunctions}>
      {children}
    </ActivitiesContext.Provider>
  );
}

export function useActivitiesContext() {
  return useContext(ActivitiesContext);
}
