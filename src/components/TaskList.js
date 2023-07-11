// components/TaskList.js
import React from 'react';
import Task from './Task';

function TaskList({ tasks, handleTaskCompletion, handleTaskDeletion, listType, moveTask, switchTaskList }) {
  const filteredTasks = tasks.filter(task => task.listType === listType);

  return (
    <div >
      {filteredTasks.map((task, index) => (
        <Task
          key={task.id}
          index={index}
          task={task}
          handleTaskCompletion={handleTaskCompletion}
          handleTaskDeletion={handleTaskDeletion}
          listType={listType}
          moveTask={moveTask}
          tasks={tasks}
          switchTaskList={switchTaskList}
        />
      ))}
    </div>
  );
}

export default TaskList;
