import React from 'react';
import Modal from 'react-modal';
import { FaCog } from 'react-icons/fa';
import { saveToLocalStorage } from '../utils/localStorage';

Modal.setAppElement('#root'); // This line is important for accessibility purposes

function ConfigModal({ isOpen, onRequestClose, onConfirm, needToDoTime, wantToDoTime, setNeedToDoTime, setWantToDoTime }) {
  const handleConfirm = (e) => {
    e.preventDefault();
    saveToLocalStorage('needToDoTime', needToDoTime / 60);
    saveToLocalStorage('wantToDoTime', wantToDoTime / 60);
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
          <span>Need To Do Time (minutes):</span>
          <input type="number" value={needToDoTime / 60} onChange={e => setNeedToDoTime(e.target.value * 60)} className="mt-1 block w-full dark:bg-gray-700 dark:text-white p-2 rounded-md" />
        </label>
        <label className="block text-gray-900 dark:text-white">
          <span>Want To Do Time (minutes):</span>
          <input type="number" value={wantToDoTime / 60} onChange={e => setWantToDoTime(e.target.value * 60)} className="mt-1 block w-full dark:bg-gray-700 dark:text-white p-2 rounded-md" />
        </label>
        <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</button>
      </form>
    </Modal>
  );
}

export default ConfigModal;
