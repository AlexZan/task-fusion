// serviceWorkerHelper.js
export const startRepeatTaskInServiceWorker = (taskId, duration) => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        action: 'startRepeatTask',
        taskId,
        duration,
      });
    } else {
      console.warn('Service worker controller not found. Unable to start repeat task.');
    }
};
  
export const stopRepeatTaskInServiceWorker = (taskId) => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        action: 'stopRepeatTask',
        taskId,
      });
    } else {
      console.warn('Service worker controller not found. Unable to stop repeat task.');
    }
};

// Add any other service worker related utilities or functions as needed.
