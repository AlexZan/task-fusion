import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { TasksProvider } from './context/TasksContext';
import TaskTimer from './components/TaskTimer';
import TaskList from './components/TaskList';
import RepeatTasksModal from './components/RepeatTasks/RepeatTasksModal';
import Activities from './components/Activities'; // Import Activities

function RepeatTasksButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center absolute top-0 right-0 m-2 hover:bg-blue-700 transition-colors duration-200 cursor-pointer z-10"
    >
      <FaClock size={16} className="text-white-500 hover:text-gray-700 transition-colors duration-200" />
    </button>
  );
}

function App() {
  const [isRepeatingTasksModalOpen, setIsRepeatingTasksModalOpen] = useState(false);

  return (
    <TasksProvider>
      <div className="App theme-bg-darker min-h-screen theme-text-dark">
        <header className="text-center padding-medium">
          <img src={process.env.PUBLIC_URL + '/logo-thin.PNG'} alt="Logo" className="mx-auto w-1/2 max-w-xs" />
        </header>
        <div className="container mx-auto max-w-5xl">
          <div className="gap-4 padding-large border-radius-large margin-top-medium">
            <TaskTimer />
          </div>  
          <DndProvider backend={HTML5Backend}>
          <div className="lg:flex gap-4 padding-large border-radius-large margin-top-medium">
            <div className="theme-bg-dark border-radius-large lg:flex-grow lg:w-3/4 mb-4 lg:mb-0 relative">
              <RepeatTasksButton onClick={() => setIsRepeatingTasksModalOpen(true)} />
              <TaskList />
            </div>
            <div className="theme-bg-dark border-radius-large lg:w-1/4 mb-4 lg:mb-0">
              <Activities />
            </div>
          </div>
        </DndProvider>
        </div>
        <RepeatTasksModal isOpen={isRepeatingTasksModalOpen} onClose={() => setIsRepeatingTasksModalOpen(false)} />
      </div>
    </TasksProvider>
  );
}

export default App;
