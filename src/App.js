import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskTimer from './components/TaskTimer';
import CompletedTasks from './components/CompletedTasks';
import useTasks from './hooks/useTasks';

function App() {
  const {
    needToTasks,
    likeToTasks,
    addTask,
    handleTaskCompletion,
    handleTaskDeletion,
    moveTask
  } = useTasks();

  return (
    <div className="App dark:bg-gray-900 min-h-screen text-white">
      <header className="text-center p-4">
        <img src="/logo.png" alt="Logo" className="mx-auto w-1/2 max-w-xs" />
      </header>
      <div className="container mx-auto max-w-2xl">
        <TaskTimer />
        <TaskForm addTask={addTask} />
        <DndProvider backend={HTML5Backend}>
          <div className="flex  dark:bg-gray-800 p-6 rounded-lg mt-4">
            <div className="w-1/2 p-4">
              <h2 className="text-2xl mb-4">Need To</h2>
              <TaskList tasks={needToTasks} handleTaskCompletion={handleTaskCompletion} handleTaskDeletion={handleTaskDeletion} listType="need-to" moveTask={moveTask} />
            </div>
            <div className="w-1/2 p-4">
              <h2 className="text-2xl mb-4">Like To</h2>
              <TaskList tasks={likeToTasks} handleTaskCompletion={handleTaskCompletion} handleTaskDeletion={handleTaskDeletion} listType="like-to" moveTask={moveTask}/>
            </div>
          </div>
        </DndProvider>
        <CompletedTasks tasks={[...needToTasks, ...likeToTasks].filter(task => task.completed)} />
      </div>
    </div>
  );
}

export default App;
