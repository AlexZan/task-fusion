import React, { useState, useContext } from 'react';
import { TasksContext } from '../context/TasksContext';
import Task from './Task';
import ItemInput from './ItemInput';

function TaskList() {
  const { activeTasks, addTask } = useContext(TasksContext);
  const [newTask, setNewTask] = useState('');
  const [recentlyAddedTaskId, setRecentlyAddedTaskId] = useState(null);

  const tasks = activeTasks.filter(task => !task.isCompleted);

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newTask.trim() !== '') {
      const newTaskId = Date.now().toString();
      const newTaskObj = {
        id: newTaskId,
        task: newTask,
        repeat: null,
      };
      addTask(newTaskObj);
      setNewTask('');
      setRecentlyAddedTaskId(newTaskId);
    }
  };

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <div className="padding-medium relative">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
      <ItemInput
        value={newTask}
        onChange={handleInputChange}
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
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
