import React, { useState } from 'react';

function TaskForm({ addTask }) {
  const [task, setTask] = useState('');
  const [listType, setListType] = useState('need-to-do');

  const handleSubmit = (event) => {
    event.preventDefault();

    addTask({
      id: Date.now().toString(),
      task,
      listType,
      status: 'not-completed',
      completionTime: null,
      completed: false,
    });

    setTask('');
    setListType('need-to-do');
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
      <select value={listType} onChange={(e) => setListType(e.target.value)} className="dark:bg-gray-700 dark:text-white p-2 rounded-md w-full mb-2">
        <option value="need-to-do">Need To Do</option>
        <option value="want-to-do">Want To Do</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded-md w-full">Add Task</button>
    </form>
  );
}

export default TaskForm;
