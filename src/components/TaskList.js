// components/TaskList.js
import React from 'react';
import Task from './Task';

function TaskList({ tasks, handleTaskCompletion, handleTaskDeletion, listType, moveTask, isMoving  }) {
  return (
    <div >
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          index={index}
          task={task}
          handleTaskCompletion={handleTaskCompletion}
          handleTaskDeletion={handleTaskDeletion}
          listType={listType}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
}

export default TaskList;
