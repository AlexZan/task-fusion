import { AiOutlineClose } from 'react-icons/ai';
import { useTasksContext } from '../context/TasksContext';
import { useActivitiesContext } from '../context/ActivitiesContext'; // Import the Activities context
import { formatTimeSpent } from '../utils/timeUtils';

function InfoPanel({ isOpen, onClose, itemId, itemType }) {
  const { activeTasks } = useTasksContext();
  const { activities } = useActivitiesContext(); // Retrieve activities

  // Determine the item based on its type
  const item = itemType === 'task'
    ? activeTasks.find((task) => task.id === itemId)
    : activities.find((activity) => activity.id === itemId);

  if (!isOpen || !item) return null;

  return (
    <div className={`info-container ${isOpen ? 'open' : ''}`}>
      <div className="info-panel p-4 theme-bg-dark border-radius-medium margin-small">
        <button onClick={onClose} className="float-right p-2 text-white hover:text-blue-500">
          <AiOutlineClose />
        </button>
        <h3 className="text-2xl font-semibold mb-4">Tracking Information</h3>
        <p className="mb-2"><strong>Name:</strong> {item.name}</p>
        <p className="mb-2"><strong>Time Spent:</strong> {formatTimeSpent(item.timeSpent * 60)}</p>
        <p><strong>First Started:</strong> 2023-07-15</p>
      </div>
    </div>
  );
}

export default InfoPanel;
