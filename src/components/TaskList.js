import React, { useState, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

import Task from './Task';
import ItemInput from './ItemInput';
import useActiveTasks from '../hooks/useActiveTasks';

function TaskList({ onShowInfoPanel }) {
  const [newTask, setNewTask] = useState('');
  const [recentlyAddedTaskId, setRecentlyAddedTaskId] = useState(null);

  const { activeTasks, handleAddTask } = useActiveTasks();

  const tasks = activeTasks.filter(task => !task.isCompleted);

  // Detect touch device and select backend inside component (after window is available)
  const { backend, backendOptions } = useMemo(() => {
    const isTouchDevice = (
      typeof window !== 'undefined' &&
      (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0))
    );

    return {
      backend: isTouchDevice ? TouchBackend : HTML5Backend,
      backendOptions: isTouchDevice
        ? { enableMouseEvents: true, delayTouchStart: 200 }
        : {}
    };
  }, []);

  const handleInputKeyPress = (e) => {
    if ((e.key === 'Enter' || e.type === 'submit') && newTask.trim() !== '') {
      const newTaskObj = {
        name: newTask,
        repeat: null,
      };
      handleAddTask(newTaskObj);
      setNewTask('');
      setRecentlyAddedTaskId(newTaskObj.id);
    }
  };

  return (
    <DndProvider backend={backend} options={backendOptions}>
      <div className="padding-medium relative">
        <h2 className="text-2xl font-semibold">Tasks</h2>
        <ItemInput
          isOpen={true}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleInputKeyPress}
          placeholder="Type a new task and press Enter"
        />
        <div>
          {tasks.map((task, index) => (
            <Task
              key={task.id}
              index={index}
              task={task}
              recentlyAdded={task.id === recentlyAddedTaskId}
              onShowInfoPanel={onShowInfoPanel}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default TaskList;
