  import { useState, useEffect } from 'react';
  import { v4 as uuidv4 } from 'uuid';

  import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
  import tasksData from '../tasks.json';

  export default function useTasks() {
    const [isTrackingMode, setTrackingMode] = useState(false);

    const [activeTasks, setActiveTasks] = useState(
      loadFromLocalStorage('activeTasks') ||
      tasksData.tasks.map((task, index) => ({ ...task, originalIndex: index }))
    );

    const [completedTasks, setCompletedTasks] = useState(
      loadFromLocalStorage('completedTasks') || []
    );
    
    useEffect(() => {
      saveToLocalStorage('activeTasks', activeTasks);
      saveToLocalStorage('completedTasks', completedTasks);
    }, [activeTasks, completedTasks]);

    const addTask = (task) => {
      const newTask = {
        id: uuidv4(), // Generate a unique UUID
        ...task,
      };
      setActiveTasks((prevTasks) => [newTask, ...prevTasks]);
    };

    const moveTask = (fromIndex, toIndex, listType) => {
      setActiveTasks(prevTasks => {
        const tasksOfType = prevTasks.filter(task => task.listType === listType);
        const allOtherTasks = prevTasks.filter(task => task.listType !== listType);
    
        const draggedTask = tasksOfType[fromIndex];
        const newTasksOfType = [...tasksOfType];
        newTasksOfType.splice(fromIndex, 1); // remove the dragged task
        newTasksOfType.splice(toIndex, 0, draggedTask); // insert the dragged task at the new position
    
        // If the list type is 'need-to-do', the new task list should start with tasks of type 'need-to-do'
        return listType === 'need-to-do' 
          ? [...newTasksOfType, ...allOtherTasks] 
          : [...allOtherTasks, ...newTasksOfType];
      });
    };
    

    const toggleTaskCompletion = (id, listType) => {
      if (listType.includes('completed')) {
        const index = completedTasks.findIndex((task) => task.id === id);
        const taskToUncomplete = completedTasks[index];
        setActiveTasks((prevActiveTasks) => [
          taskToUncomplete,
          ...prevActiveTasks,
        ]);
        setCompletedTasks((prevCompletedTasks) => prevCompletedTasks.filter((_, i) => i !== index));
      } else {
        const index = activeTasks.findIndex((task) => task.id === id);
        const taskToComplete = activeTasks[index];
        setCompletedTasks((prevCompletedTasks) => [
          taskToComplete,
          ...prevCompletedTasks,
        ]);
        setActiveTasks((prevActiveTasks) => prevActiveTasks.filter((_, i) => i !== index));
      }
    };

    const handleTaskDeletion = (id) => {
      setActiveTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
      setCompletedTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    };

    const switchTaskList = (id, newListType) => {
      setActiveTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
          task.id === id ? { ...task, listType: newListType } : task
        );
        return updatedTasks;
      });
    };

  const enterTrackingMode = () => {
    setTrackingMode(true);
  };

  const exitTrackingMode = () => {
    setTrackingMode(false);
  };



    return {
      activeTasks,
      completedTasks,
      addTask,
      toggleTaskCompletion,
      handleTaskDeletion,
      switchTaskList,
      moveTask,
      isTrackingMode,
      enterTrackingMode,
      exitTrackingMode,
    };
  }
