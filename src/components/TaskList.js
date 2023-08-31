import React, { useState, useContext } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { TasksContext } from '../context/TasksContext';
import Task from './Task';
import ItemInput from './ItemInput';

function TaskList({ onShowInfoPanel }) {
  const [newTask, setNewTask] = useState('');
  const [recentlyAddedTaskId, setRecentlyAddedTaskId] = useState(null);

  const { activeTasks, addTask } = useContext(TasksContext);

  const tasks = activeTasks.filter(task => !task.isCompleted);



  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newTask.trim() !== '') {
      const newTaskId = Date.now().toString();
      const newTaskObj = {
        id: newTaskId,
        name: newTask,
        repeat: null,
      };
      addTask(newTaskObj);
      setNewTask('');
      setRecentlyAddedTaskId(newTaskId);
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
          onKeyPress={(e) => { if (e.key === 'Enter') handleInputKeyPress(e); }}
          placeholder="Type a new task and press Enter"
        />
        <div>
          {tasks.map((task, index) => (
            <Task
              key={task.id}
              index={index}
              task={task}
              tasks={tasks}
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
