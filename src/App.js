import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { TasksProvider, useTasksContext } from './context/TasksContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskTimer from './components/TaskTimer';

function App() {
  return (
    <TasksProvider>
      <div className="App dark:bg-gray-900 min-h-screen text-white">
        <header className="text-center p-4">
          <img src={process.env.PUBLIC_URL + '/logo-thin.PNG'} alt="Logo" className="mx-auto w-1/2 max-w-xs" />
        </header>
        <div className="container mx-auto max-w-5xl">
          <TaskTimer />
          <TaskForm />
          <DndProvider backend={HTML5Backend}>
            <div className="flex  dark:bg-gray-800 p-6 rounded-lg mt-4">
              <TaskListSection listType="need-to-do" />
              <TaskListSection listType="want-to-do" />
            </div>
            <div className="flex  dark:bg-gray-800 p-6 rounded-lg mt-4">
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
  const { activeTasks, completedTasks } = useTasksContext();
  let tasks;

  if (listType.startsWith('completed')) {
    tasks = completedTasks.filter(task => task.listType === listType.slice(10)); // remove 'completed-' from listType
  } else {
    tasks = activeTasks.filter(task => task.listType === listType);
  }

  return (
    <div className="w-1/2 p-4">
      <h2 className="text-2xl mb-4">{listType.replace('-', ' ')}</h2>
      <TaskList tasks={tasks} listType={listType} />
    </div>
  );
}


export default App;
