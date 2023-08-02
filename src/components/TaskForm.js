import React, { useState } from 'react';
import RepeatTasksModal from './RepeatTasksModal';
import { FaClock } from 'react-icons/fa';

function TaskForm({ addTask }) {
  const [task, setTask] = useState('');
  const [listType, setListType] = useState('need-to-do');
  const [recurrence, setRecurrence] = useState('once');
  const [isRepeatingTasksModalOpen, setIsRepeatingTasksModalOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    addTask({
      id: Date.now().toString(),
      task,
      listType,
      recurrence,
      status: 'not-completed',
      completionTime: null,
      completed: false,
    });

    setTask('');
    setListType('need-to-do');
    setRecurrence('once');
  };

  return (
    <form onSubmit={handleSubmit} className="dark:bg-gray-800 p-6 rounded-lg mt-4">
      <textarea
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Task"
        required
        className="dark:bg-gray-700 dark:text-white p-2 rounded-md w-full mb-2 h-24"
      />
      <div className="flex justify-between items-end">
        <div className="w-1/3 mr-2">
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2" htmlFor="listType">List Type</label>
          <select id="listType" value={listType} onChange={(e) => setListType(e.target.value)} className="dark:bg-gray-700 dark:text-white p-2 rounded-md w-full">
            <option value="need-to-do">Need To Do</option>
            <option value="want-to-do">Want To Do</option>
          </select>
        </div>
        <div className="w-1/3 mr-2">
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2" htmlFor="recurrence">Recurrence</label>
          <select id="recurrence" value={recurrence} onChange={(e) => setRecurrence(e.target.value)} className="dark:bg-gray-700 dark:text-white p-2 rounded-md w-full">
            <option value="once">Once</option>
            <option value="1 day">1 Day</option>
            <option value="1 week">1 Week</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="w-1/3 flex justify-between">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-1/2">Add Task</button>
          <button
            type="button"
            onClick={() => setIsRepeatingTasksModalOpen(true)}
            className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-2"
          >
            <FaClock size={16} />
          </button>

        </div>
      </div>
      <RepeatTasksModal isOpen={isRepeatingTasksModalOpen} onClose={() => setIsRepeatingTasksModalOpen(false)} />
    </form>
  );
}

export default TaskForm;
