import React, { useState } from 'react'; // Import useState
import { FaClock } from 'react-icons/fa'; // Import the icon
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { TasksProvider } from './context/TasksContext';
import TaskTimer from './components/TaskTimer';
import TaskListSection from './components/TaskListSection';
import RepeatTasksModal from './components/RepeatTasks/RepeatTasksModal';


function RepeatTasksButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center absolute top-0 right-0 m-2 hover:bg-blue-700 transition-colors duration-200 cursor-pointer z-10" // Added z-10
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
          <TaskTimer />
          <DndProvider backend={HTML5Backend}>
            <div className="relative">
            <RepeatTasksButton onClick={() => setIsRepeatingTasksModalOpen(true)} />
              <div className="flex theme-bg-dark padding-large border-radius-large margin-top-medium">
                <TaskListSection listType="need-to-do" title="Need to Do" />
                <TaskListSection listType="want-to-do" title="Want to Do" />
              </div>
            </div>
            <div className="flex theme-bg-dark padding-large border-radius-large margin-top-medium">
              <TaskListSection listType="completed-need-to-do" title="Completed Need to Do" />
              <TaskListSection listType="completed-want-to-do" title="Completed Want to Do" />
            </div>
          </DndProvider>
        </div>
        <RepeatTasksModal isOpen={isRepeatingTasksModalOpen} onClose={() => setIsRepeatingTasksModalOpen(false)} /> {/* Render the modal */}
      </div>
    </TasksProvider>
  );
}

export default App;
