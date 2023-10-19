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
  
  export const requestPermissionNotification = () => {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // If permission is already granted
      console.log("Permission to receive notifications has been granted previously");
    } else if (Notification.permission !== "denied" || Notification.permission === "default") {
      // Otherwise, ask the user for permission
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          console.log("Permission to receive notifications has been granted");
        }
      });
    }
  }