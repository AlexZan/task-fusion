import React from 'react';
import Task from './Task';

function TaskList({ tasks, listType }) {
  return (
    <div >
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          index={index}
          task={task}
          listType={listType}
          tasks={tasks}
        />
      ))}
    </div>
  );
}

export default TaskList;
