import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Task from './Task';
import ItemInput from './ItemInput';
import useActiveTasks from '../hooks/useActiveTasks';

function TaskList({ onShowInfoPanel }) {
  const [newTask, setNewTask] = useState('');
  const [recentlyAddedTaskId, setRecentlyAddedTaskId] = useState(null);

  const { activeTasks, handleAddTask } = useActiveTasks();

  const tasks = activeTasks.filter(task => !task.isCompleted);

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newTask.trim() !== '') {
      e.preventDefault();
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
    <DndProvider backend={HTML5Backend}>
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
