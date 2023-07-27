import React, { createContext, useContext } from 'react';
import useTasks from '../hooks/useTasks';

export const TasksContext = createContext();

export function TasksProvider({ children }) {
  const tasksFunctions = useTasks();

  return (
    <TasksContext.Provider value={tasksFunctions}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  return useContext(TasksContext);
}
