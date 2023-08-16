import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';

import { TasksProvider } from './context/TasksContext';
import TaskTimer from './components/TaskTimer';
import TaskList from './components/TaskList';
import RepeatTasksModal from './components/RepeatTasks/RepeatTasksModal';
import Activities from './components/Activities';
import CompletedTasks from './components/CompletedTasks';
import InfoPanel from './components/InfoPanel';

function RepeatTasksButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-500 text-white rounded-full w-8 h-8 flex items-center justify-center absolute top-0 right-0 m-2 hover:bg-blue-500 transition-colors duration-200 cursor-pointer z-10"
    >
      <FaClock size={16} className="text-white-500 hover:text-white transition-colors duration-200" />
    </button>
  );
}


function App() {
  const [isRepeatingTasksModalOpen, setIsRepeatingTasksModalOpen] = useState(false);
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowInfoPanel = (item) => {
    console.log('Item clicked:', item);
    setSelectedItem(item);
    setIsInfoPanelOpen(true);
  };

  return (
    <TasksProvider>
      <div className="App theme-bg-darker min-h-screen theme-text-dark">
        <header className="text-center padding-small">
          <img src={process.env.PUBLIC_URL + '/logo-thin.PNG'} alt="Logo" className="mx-auto w-1/2 max-w-xs" />
        </header>
        <div className="container mx-auto max-w-5xl">
          <div className="gap-4 padding-small ">
            <TaskTimer />
          </div>
          <InfoPanel isOpen={isInfoPanelOpen} itemId={selectedItem?.id} onClose={() => setIsInfoPanelOpen(false)} />

          <div className="lg:flex gap-4 padding-small">
            <div className="theme-bg-dark border-radius-medium lg:flex-grow lg:w-2/3 mb-4 lg:mb-0 relative">
              <RepeatTasksButton onClick={() => setIsRepeatingTasksModalOpen(true)} />
              <TaskList onShowInfoPanel={handleShowInfoPanel} />
            </div>
            <div className="theme-bg-dark border-radius-medium lg:w-1/3 lg:mb-0">
              <Activities onShowInfoPanel={handleShowInfoPanel} />
            </div>
          </div>
          <div className="gap-4 padding-small">
            <CompletedTasks />
          </div>
        </div>
        <RepeatTasksModal isOpen={isRepeatingTasksModalOpen} onClose={() => setIsRepeatingTasksModalOpen(false)} />
      </div>
    </TasksProvider>
  );
}

export default App;
