// hooks/useTasks.js
import { useState, useEffect } from 'react';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/localStorage';
import tasksData from '../tasks.json';

export default function useTasks() {
  const [needToDoTasks, setNeedToDoTasks] = useState(loadFromLocalStorage('needToDoTasks') || tasksData.needToDoTasks);
  const [wantToDoTasks, setWantToDoTasks] = useState(loadFromLocalStorage('wantToDoTasks') || tasksData.wantToDoTasks);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    saveToLocalStorage('needToDoTasks', needToDoTasks);
    saveToLocalStorage('wantToDoTasks', wantToDoTasks);
  }, [needToDoTasks, wantToDoTasks]);

  const addTask = (task) => {
    if (task.listType === 'need-to-do') {
      setNeedToDoTasks((prevTasks) => [task, ...prevTasks]);
    } else {
      setWantToDoTasks((prevTasks) => [task, ...prevTasks]);
    }
  };

  const handleTaskCompletion = (id, listType) => {
    if (listType === 'need-to-do') {
      setNeedToDoTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
    } else {
      setWantToDoTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: true } : task
        )
      );
    }
  };

  const handleTaskDeletion = (id, listType) => {
    if (listType === 'need-to-do') {
      setNeedToDoTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    } else {
      setWantToDoTasks((prevTasks) =>
        prevTasks.filter((task) => task.id !== id)
      );
    }
  };

  const moveTask = async (dragIndex, hoverIndex, listType) => {
  setIsMoving(true);

  const list = listType === 'need-to-do' ? needToDoTasks : wantToDoTasks;

  const newList = [...list];
  const [draggedTask] = newList.splice(dragIndex, 1);
  newList.splice(hoverIndex, 0, draggedTask);

  if (listType === 'need-to-do') {
    await setNeedToDoTasks(newList);
  } else {
    await setWantToDoTasks(newList);
  }

  setIsMoving(false);
};

  return {
    needToDoTasks,
    wantToDoTasks,
    addTask,
    handleTaskCompletion,
    handleTaskDeletion,
    moveTask,
    isMoving,
  };
}
