import React, {useState} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { TasksProvider, useTasksContext } from './context/TasksContext';
import TaskList from './components/TaskList';
import TaskTimer from './components/TaskTimer';

function App() {
  return (
    <TasksProvider>
      <div className="App theme-bg-darker min-h-screen theme-text-dark">
        <header className="text-center padding-medium">
          <img src={process.env.PUBLIC_URL + '/logo-thin.PNG'} alt="Logo" className="mx-auto w-1/2 max-w-xs" />
        </header>
        <div className="container mx-auto max-w-5xl">
          <TaskTimer />
          <DndProvider backend={HTML5Backend}>
            <div className="flex theme-bg-dark padding-large border-radius-large margin-top-medium">
              <TaskListSection listType="need-to-do" />
              <TaskListSection listType="want-to-do" />
            </div>
            <div className="flex theme-bg-dark padding-large border-radius-large margin-top-medium">
              <TaskListSection listType="completed-need-to-do" />
              <TaskListSection listType="completed-want-to-do" />
            </div>
          </DndProvider>
        </div>
      </div>
    </TasksProvider>
  );
}

function TaskListSection({ listType }) {
  const { activeTasks, completedTasks, addTask } = useTasksContext();
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter' && newTask.trim() !== '') {
      addTask({
        task: newTask,
        listType,
        repeat: null,
      });
      setNewTask(''); // Clear the input after adding the task
    }
  };

  let tasks;
  if (listType.startsWith('completed')) {
    tasks = completedTasks.filter(task => task.listType === listType.slice(10));
  } else {
    tasks = activeTasks.filter(task => task.listType === listType);
  }

  return (
    <div className="w-1/2 padding-medium">
      <h2 className="text-2xl margin-bottom-small">{listType.replace('-', ' ')}</h2>
      {/* Input box for adding new tasks - only for active lists */}
      {listType !== 'completed-need-to-do' && listType !== 'completed-want-to-do' && (
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
          className="input-theme"
          placeholder="Type a new task and press Enter"
        />
      )}
      <TaskList tasks={tasks} listType={listType} />
    </div>
  );
}


export default App;
