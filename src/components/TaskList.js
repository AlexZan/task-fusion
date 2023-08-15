import React, { useState, useContext } from 'react';
import { TasksContext } from '../context/TasksContext';
import Task from './Task';
import ItemInput from './ItemInput';
import { useTimeTracking } from '../hooks/useTimeTracking';

function TaskList() {
  const [newTask, setNewTask] = useState('');
  const [recentlyAddedTaskId, setRecentlyAddedTaskId] = useState(null);

  const { activeTasks, addTask } = useContext(TasksContext);
  const timeTracking = useTimeTracking();

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
            timeTracking={timeTracking}
            recentlyAdded={task.id === recentlyAddedTaskId}
          />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
