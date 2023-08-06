import { useState } from 'react';

import { useTasksContext } from '../context/TasksContext';
import TaskList from '../components/TaskList';

export default function TaskListSection({ listType }) {
    const { activeTasks, completedTasks, addTask } = useTasksContext();
    const [newTask, setNewTask] = useState('');
  
    // Track the ID of the recently added task
    const [recentlyAddedTaskId, setRecentlyAddedTaskId] = useState(null);

    const handleInputKeyPress = (e) => {
      if (e.key === 'Enter' && newTask.trim() !== '') {
        const newTaskId = Date.now().toString(); // Generate a new ID for the task
        const newTaskObj = {
          id: newTaskId, // Include the ID in the new task object
          task: newTask,
          listType,
          repeat: null,
        };
        addTask(newTaskObj);
        setNewTask(''); // Clear the input after adding the task
        setRecentlyAddedTaskId(newTaskId); // Set the recently added task ID
      }
    };
  
  
    const handleInputChange = (e) => {
      setNewTask(e.target.value);
    };
  
    let tasks;
    if (listType.startsWith('completed')) {
      tasks = completedTasks.filter(task => task.listType === listType.slice(10));
    } else {
      tasks = activeTasks.filter(task => task.listType === listType);
    }
  
    return (
        <div className="w-1/2 padding-medium relative"> {/* Add relative positioning here */}
          <h2 className="text-2xl margin-bottom-small">{listType.replace('-', ' ')}</h2>
          {/* Input box for adding new tasks - only for active lists */}
          {listType !== 'completed-need-to-do' && listType !== 'completed-want-to-do' && (
            <input
              type="text"
              value={newTask}
              onChange={handleInputChange}
              onKeyDown={(e) => { if (e.key === 'Enter') handleInputKeyPress(e); }}
              className="input-theme w-full" // Add the w-full class to make the input full width
              placeholder="Type a new task and press Enter"
            />
          )}
          <TaskList tasks={tasks} listType={listType} recentlyAddedTaskId={recentlyAddedTaskId} />
        </div>
      );
      
  }