import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { FaCog } from 'react-icons/fa';
import useTimer from '../hooks/useTimer';
import useTime from '../hooks/useTime';

function ConfigModal({ isOpen, onClose }) {
  const { reset } = useTimer();
  const { updateProductivityTime, updateEnjoymentTime, productivityTime,enjoymentTime } = useTime();

    // Local states for productivity and enjoyment times
    const [localProductiveTime, setLocalProductiveTime] = useState(productivityTime);
    const [localEnjoymentTime, setLocalEnjoymentTime] = useState(enjoymentTime);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateProductivityTime(localProductiveTime);
    updateEnjoymentTime(localEnjoymentTime);
    onClose();
  };

  useEffect(() => {
    reset();  // Reset the timer whenever the global times change
}, [productivityTime, enjoymentTime]);

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
                <span>Productivity (minutes):</span>
                <input type="number" value={localProductiveTime / 60} onChange={e => setLocalProductiveTime(e.target.value * 60)} className="mt-1 block w-full dark:bg-gray-700 dark:text-white p-2 rounded-md" />
              </label>
              <label className="block text-gray-900 dark:text-white">
                <span>Enjoyment (minutes):</span>
                <input type="number" value={localEnjoymentTime / 60} onChange={e => setLocalEnjoymentTime(e.target.value * 60)} className="mt-1 block w-full dark:bg-gray-700 dark:text-white p-2 rounded-md" />
              </label>
              <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</button>
            </form>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ConfigModal;
