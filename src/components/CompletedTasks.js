import React, { useState } from 'react';
import useCompletedTasks from '../hooks/useCompletedTasks';
import CompletedTasksTable from './CompletedTasksTable';

const CompletedTasks = () => {
  const { completedTasks, handleUndoCompletion } = useCompletedTasks();
  // const { completedTasks, uncompleteTask } = useContext(TasksContext);
  const [filter, setFilter] = useState("");

  if (!completedTasks) {
    return null; // Or a loading spinner, or some placeholder content.
  }

  // Filtered data based on search input
  const filteredTasks = completedTasks.filter(task => task?.name?.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="theme-bg-dark border-radius-medium relative padding-medium">
      <h2 className="text-2xl font-semibold theme-text-dark">Completed Tasks</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search completed tasks..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="item-input-theme w-full dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
        />

      </div>

      {/* Table View */}
      <CompletedTasksTable data={filteredTasks} handleUndoCompletion={handleUndoCompletion} />
    </div>
  );
};

export default CompletedTasks;
