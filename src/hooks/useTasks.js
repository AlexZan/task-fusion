import { useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import tasksData from '../place-holder-data.json';

const initialState = {
  isTrackingMode: false,
  activeTasks: loadFromLocalStorage('activeTasks') ||
    tasksData.tasks.map((task, index) => ({ ...task, originalIndex: index, isCompleted: false, timeSpent: 0 })),
  completedTasks: loadFromLocalStorage('completedTasks') || [],
};

const actionTypes = {
  ADD_TASK: 'ADD_TASK',
  MOVE_TASK: 'MOVE_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
  UNCOMPLETE_TASK: 'UNCOMPLETE_TASK',
  DELETE_TASK: 'DELETE_TASK',
  UPDATE_TIME_SPENT: 'UPDATE_TIME_SPENT',
};

const tasksReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      const newTask = { id: uuidv4(), ...action.payload };
      return { ...state, activeTasks: [newTask, ...state.activeTasks] };
    case actionTypes.MOVE_TASK:
      const { fromIndex, toIndex } = action.payload;
      const newTasks = [...state.activeTasks];
      const draggedTask = newTasks[fromIndex];
      newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, draggedTask);
      return { ...state, activeTasks: newTasks };
    case actionTypes.COMPLETE_TASK:
      const indexToComplete = state.activeTasks.findIndex((task) => task.id === action.payload);
      const taskToComplete = state.activeTasks[indexToComplete];
      return {
        ...state,
        completedTasks: [taskToComplete, ...state.completedTasks],
        activeTasks: state.activeTasks.filter((_, i) => i !== indexToComplete),
      };
    case actionTypes.UNCOMPLETE_TASK:
      const indexToUncomplete = state.completedTasks.findIndex((task) => task.id === action.payload);
      const taskToUncomplete = state.completedTasks[indexToUncomplete];
      return {
        ...state,
        completedTasks: state.completedTasks.filter((_, i) => i !== indexToUncomplete),
        activeTasks: [taskToUncomplete, ...state.activeTasks],
      };
    case actionTypes.DELETE_TASK:
      return {
        ...state,
        activeTasks: state.activeTasks.filter((task) => task.id !== action.payload),
        completedTasks: state.completedTasks.filter((task) => task.id !== action.payload),
      };
    case actionTypes.UPDATE_TIME_SPENT:
      const updatedTasks = state.activeTasks.map((task) => {
        if (task === action.payload.task) {
          return { ...task, timeSpent: (task.timeSpent || 0) + action.payload.timeSpent };
        }
        return task;
      });
      return { ...state, activeTasks: updatedTasks };
    default:
      return state;
  }
};

export default function useTasks() {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  useEffect(() => {
    saveToLocalStorage('activeTasks', state.activeTasks);
    saveToLocalStorage('completedTasks', state.completedTasks);
  }, [state.activeTasks, state.completedTasks]);

  const addTask = (task) => dispatch({ type: actionTypes.ADD_TASK, payload: task });
  const moveTask = (fromIndex, toIndex) => dispatch({ type: actionTypes.MOVE_TASK, payload: { fromIndex, toIndex } });
  const completeTask = (id) => dispatch({ type: actionTypes.COMPLETE_TASK, payload: id });
  const uncompleteTask = (id) => dispatch({ type: actionTypes.UNCOMPLETE_TASK, payload: id });
  const deleteTask = (id) => dispatch({ type: actionTypes.DELETE_TASK, payload: id });
  const updateTimeSpent = (task, timeSpent) => dispatch({ type: actionTypes.UPDATE_TIME_SPENT, payload: { task, timeSpent } });

  const getCurrentTask = () => state.activeTasks.find((task) => !task.isCompleted);

  return {
    activeTasks: state.activeTasks,
    completedTasks: state.completedTasks,
    completeTask,
    uncompleteTask,
    addTask,
    deleteTask,
    moveTask,
    isTrackingMode: state.isTrackingMode,
    getCurrentTask,
    updateTimeSpent,
  };
}
