export const startTimerInServiceWorker = (duration) => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        action: 'start',
        duration: duration,
      });
    }
  };
  
  export const stopTimerInServiceWorker = () => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ action: 'stop' });
    }
  };
  
  export const resetTimerInServiceWorker = () => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ action: 'reset' });
    }
  };
  