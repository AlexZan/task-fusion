function CompletedTasks({ tasks }) {
    return (
      <div className="mt-4">
        <h2 className="text-2xl mb-4">Completed Tasks</h2>
        {tasks.filter(task => task.completed).map((task) => (
          <div key={task.id} className="line-through text-gray-400">
            {task.task}
          </div>
        ))}
      </div>
    );
  }
  
export default CompletedTasks;
  