import { AiOutlineDelete } from 'react-icons/ai';

function TaskList({ tasks, handleTaskCompletion, handleTaskDeletion, listType }) {
  return (
    <div>
      {tasks.filter(task => !task.completed).map((task) => (
        <div key={task.id} className="flex items-center mb-2">
          <input 
            type="checkbox" 
            className="mr-2 form-checkbox text-blue-600" 
            onClick={() => handleTaskCompletion(task.id, listType)}
          />
          <p className="dark:text-white">{task.task}</p>
          <button 
            className="ml-2 text-gray-500 hover:text-red-500 transition-colors duration-200"
            onClick={() => handleTaskDeletion(task.id, listType)}
          >
            <AiOutlineDelete />
          </button>
        </div>
      ))}
    </div>
  );
}



export default TaskList;
