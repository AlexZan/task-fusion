import React from 'react';
import Modal from 'react-modal';
import { FaCog } from 'react-icons/fa';
import { saveToLocalStorage } from '../utils/localStorage';

Modal.setAppElement('#root'); // This line is important for accessibility purposes

function ConfigModal({ isOpen, onRequestClose, onConfirm, workTime, breakTime, setWorkTime, setBreakTime }) {
  const handleConfirm = (e) => {
    e.preventDefault();
    saveToLocalStorage('workTime', workTime / 60);
    saveToLocalStorage('breakTime', breakTime / 60);
    onConfirm(e);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Configuration Modal"
      className="p-4 bg-white dark:bg-gray-800 rounded-lg outline-none relative mx-2 md:mx-auto w-full md:w-96"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <h2 className="text-2xl mb-4 flex items-center text-gray-900 dark:text-white"><FaCog className="mr-2" /> Configuration</h2>
      <form onSubmit={handleConfirm} className="space-y-4">
        <label className="block text-gray-900 dark:text-white">
          <span>Work Time (minutes):</span>
          <input type="number" value={workTime / 60} onChange={e => setWorkTime(e.target.value * 60)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white" />
        </label>
        <label className="block text-gray-900 dark:text-white">
          <span>Break Time (minutes):</span>
          <input type="number" value={breakTime / 60} onChange={e => setBreakTime(e.target.value * 60)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white" />
        </label>
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Confirm</button>
      </form>
    </Modal>
  );
}

export default ConfigModal;
