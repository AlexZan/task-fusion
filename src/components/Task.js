import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { AiOutlineDelete } from 'react-icons/ai';

function Task({ task, handleTaskCompletion, handleTaskDeletion, listType, moveTask, index, tasks}) {
  const ref = useRef(null);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: () => {
      const currentIndex = tasks.findIndex(t => t.id === task.id);
      return { id: task.id, index: currentIndex };
    },
    canDrag: !task.completed,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  


  const [, drop] = useDrop({
    accept: 'task',
    hover(item, monitor) {
      if (item.id !== task.id) {
        const dragIndex = item.index;
        const sourceListType = item.listType;
        const targetListType = listType;

        const hoverBoundingRect = ref.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        
        const hoverIndex = hoverClientY < hoverMiddleY ? index : index + 1;
        

  
        // if (dragIndex === hoverIndex && sourceListType === targetListType) {
        //   return;
        // }
  
        // // Prevent moving tasks below a completed task
        // if (task.completed) {
        //   return;
        // }
  
        // const hoverBoundingRect = ref.current.getBoundingClientRect();
        // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // const clientOffset = monitor.getClientOffset();
        // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
  
        // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        //   return;
        // }
  
        // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        //   return;
        // }
  
        moveTask(dragIndex, hoverIndex, sourceListType, targetListType);
        item.index = hoverIndex;
        item.listType = targetListType; // Change the listType of the item
      }
    },
  });
  

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="flex items-center mb-2 task-container"
    >
      <input
        type="checkbox"
        checked={task.completed}
        className="mr-2 form-checkbox text-blue-600"
        onChange={() => {
          console.log(`Checkbox clicked for task with id: ${task.id} in list: ${listType}`);
          handleTaskCompletion(task.id, listType);
        }}
      />

      <p className="dark:text-white">{task.task}</p>
      <button
        className="ml-2 text-gray-500 hover:text-red-500 transition-colors duration-200 delete-button"
        onClick={() => handleTaskDeletion(task.id, listType)}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default Task;
