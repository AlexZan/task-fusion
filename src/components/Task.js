// components/Task.js
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AiOutlineDelete } from 'react-icons/ai';

function Task({ task, handleTaskCompletion, handleTaskDeletion, listType, moveTask, index }) {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'task',
    hover(item, monitor) {
      if (item.id !== task.id) {
        const hoverIndex = index;
        const dragIndex = item.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        // Time to actually perform the action
        moveTask(dragIndex, hoverIndex, listType);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      }
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center mb-2 task-container" // Add class here
    >
      <input 
        type="checkbox" 
        className="mr-2 form-checkbox text-blue-600" 
        onClick={() => handleTaskCompletion(task.id, listType)}
      />
      <p className="dark:text-white">{task.task}</p>
      <button 
        className="ml-2 text-gray-500 hover:text-red-500 transition-colors duration-200 delete-button" // Add class here
        onClick={() => handleTaskDeletion(task.id, listType)}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default Task;
