import { AiOutlineClose } from 'react-icons/ai'; // Import close icon

function InfoPanel({ isOpen, onClose, item }) {
    if (!isOpen || !item) return null;

    return (
      <div className={`info-container ${isOpen ? 'open' : ''}`}>
        <div className="info-panel p-4 theme-bg-dark border-radius-medium margin-small">
          <button onClick={onClose} className="float-right p-2 text-white hover:text-blue-500">
            <AiOutlineClose />
          </button>
          <h3 className="text-2xl font-semibold mb-4">Tracking Information</h3>
          <p className="mb-2"><strong>Name:</strong> {item.name}</p>
          <p className="mb-2"><strong>Time Spent:</strong> 2 hours 30 minutes</p>
          <p><strong>First Started:</strong> 2023-07-15</p>
        </div>
      </div>
    );
  }
  

export default InfoPanel;
