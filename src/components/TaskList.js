// components/TaskList.js
import React from 'react';
import { useDrop } from 'react-dnd';
import Task from './Task';

function TaskList({ tasks, handleTaskCompletion, handleTaskDeletion, listType, moveTask }) {
  const [, drop] = useDrop({
    accept: 'task',
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        return;
      }
      moveTask(item.id, tasks[0].id, listType);
    },
  });

  return (
    <div ref={drop}>
      {tasks.filter(task => !task.completed).map((task, index) => (
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
