import Task from './Task';

function TaskList({ tasks, listType, recentlyAddedTaskId }) {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          index={index}
          task={task}
          listType={listType}
          tasks={tasks}
          recentlyAdded={task.id === recentlyAddedTaskId} // Pass the recentlyAdded prop
        />
      ))}
    </div>
  );
}

export default TaskList;
