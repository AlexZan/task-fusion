// TimerMode.js

import React, { useState } from 'react';
import { FaClock } from 'react-icons/fa';

import Timer from './components/Timer';
import TaskList from './components/TaskList';
import RepeatTasksModal from './components/RepeatTasks/RepeatTasksModal';
import Activities from './components/Activities';
import CompletedTasks from './components/CompletedTasks';



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

function TimerMode() {
    const [isRepeatingTasksModalOpen, setIsRepeatingTasksModalOpen] = useState(false);

    return (
        <div>
            <div className="container mx-auto max-w-5xl">
                <div className="gap-4 padding-small ">
                    <Timer />
                </div>
                <div className="lg:flex gap-4 padding-small">
                    <div className="theme-bg-dark border-radius-medium lg:flex-grow lg:w-2/3 mb-4 lg:mb-0 relative">
                        <RepeatTasksButton onClick={() => setIsRepeatingTasksModalOpen(true)} />
                        <TaskList />
                    </div>
                    <div className="theme-bg-dark border-radius-medium lg:w-1/3 lg:mb-0">
                        <Activities />
                    </div>
                </div>
                <div className="gap-4 padding-small">
                    <CompletedTasks />
                </div>
            </div>
            <RepeatTasksModal isOpen={isRepeatingTasksModalOpen} onClose={() => setIsRepeatingTasksModalOpen(false)} />
        </div>

    );
}

export default TimerMode;
