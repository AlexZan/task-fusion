import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskTimer from './components/TaskTimer';
import tasksData from './tasks.json';
import CompletedTasks from './components/CompletedTasks';
import useTasks from './hooks/useTasks';

function App() {
  const {
    needToTasks,
    likeToTasks,
    addTask,
    handleTaskCompletion,
    handleTaskDeletion,
  } = useTasks();
  
  return (
    <div className="App dark:bg-gray-900 min-h-screen text-white">
      <h1 className="text-center text-4xl p-4">TaskFusion</h1>
      <div className="container mx-auto max-w-2xl">
        <TaskTimer />
        <TaskForm addTask={addTask} />
        <div className="flex divide-x dark:bg-gray-800 p-6 rounded-lg mt-4">
          <div className="w-1/2 p-4">
            <h2 className="text-2xl mb-4">Need To</h2>
            <TaskList tasks={needToTasks} handleTaskCompletion={handleTaskCompletion} handleTaskDeletion={handleTaskDeletion} listType="need-to" />
          </div>
          <div className="w-1/2 p-4">
            <h2 className="text-2xl mb-4">Like To</h2>
            <TaskList tasks={likeToTasks} handleTaskCompletion={handleTaskCompletion} handleTaskDeletion={handleTaskDeletion} listType="like-to" />
          </div>
        </div>
        <CompletedTasks tasks={[...needToTasks, ...likeToTasks].filter(task => task.completed)} />
      </div>
    </div>
  );
}

export default App;
