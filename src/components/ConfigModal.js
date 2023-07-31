import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { saveToLocalStorage } from '../utils/localStorage';

function ConfigModal({ isOpen, onClose, needToDoTime, wantToDoTime, setNeedToDoTime, setWantToDoTime }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    saveToLocalStorage('needToDoTime', needToDoTime / 60);
    saveToLocalStorage('wantToDoTime', wantToDoTime / 60);
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-gray-800 shadow-xl rounded-2xl">
            <Dialog.Title as="h2" className="text-2xl mb-4 flex items-center text-gray-900 dark:text-white">
              <FaCog className="mr-2" /> Configuration
            </Dialog.Title>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <label className="block text-gray-900 dark:text-white">
                <span>Need To Do Time (minutes):</span>
                <input type="number" value={needToDoTime / 60} onChange={e => setNeedToDoTime(e.target.value * 60)} className="mt-1 block w-full dark:bg-gray-700 dark:text-white p-2 rounded-md" />
              </label>
              <label className="block text-gray-900 dark:text-white">
                <span>Want To Do Time (minutes):</span>
                <input type="number" value={wantToDoTime / 60} onChange={e => setWantToDoTime(e.target.value * 60)} className="mt-1 block w-full dark:bg-gray-700 dark:text-white p-2 rounded-md" />
              </label>
              <p className="text-sm text-gray-500">Note: Changes will only apply to the next timer. This is intentional as to not disturb the current timer progress. You can manually reset the current timer to apply changes immediately.</p>

              <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</button>
            </form>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ConfigModal;
