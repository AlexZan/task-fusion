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
      <div className="App theme-bg-darker min-h-screen theme-text-dark">
        <header className="text-center padding-medium">
          <img src={process.env.PUBLIC_URL + '/logo-thin.PNG'} alt="Logo" className="mx-auto w-1/2 max-w-xs" />
        </header>
        <div className="container mx-auto max-w-5xl">
          <TaskTimer />
          <TaskForm />
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
  const { activeTasks, completedTasks } = useTasksContext();
  let tasks;

  if (listType.startsWith('completed')) {
    tasks = completedTasks.filter(task => task.listType === listType.slice(10)); // remove 'completed-' from listType
  } else {
    tasks = activeTasks.filter(task => task.listType === listType);
  }

  return (
    <div className="w-1/2 padding-medium">
      <h2 className="text-2xl margin-bottom-small">{listType.replace('-', ' ')}</h2>
      <TaskList tasks={tasks} listType={listType} />
    </div>
  );
}

export default App;
