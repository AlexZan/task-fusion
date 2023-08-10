// Declare a variable to store the current timer
let timerId = null;

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Close the notification
  // Focus the app's tab or open it if it's not open
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (let client of windowClients) {
        // Check if the app's tab is already open and focus it
        if (client.url === 'http://localhost:3000/' && 'focus' in client) {
          return client.focus();
        }
        
      }
      // If the app's tab is not open, open it
      return self.clients.openWindow('/');
    })
  );
});

const startTimer = (duration) => {
  // Clear any existing timer
  if (timerId) {
    clearTimeout(timerId);
  }

   // Set a new timer with the given duration
  timerId = setTimeout(() => {
    // Notify the user when the timer is finished
    self.registration.showNotification('Timer Finished!', {
      body: 'Your timer has ended.',
      icon: '/path/to/icon.png', // Optional: specify an icon
      requireInteraction: true // Keep the notification until the user interacts with it
    });
  }, duration * 1000); // Convert duration to milliseconds
};

// Function to stop the timer
const stopTimer = () => {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
};

// Function to reset the timer
const resetTimer = () => {
  stopTimer();
};

// Event listener to handle messages from the main application
self.addEventListener('message', (event) => {
  const { action, duration } = event.data;

  switch (action) {
    case 'start':
      startTimer(duration);
      break;
    case 'stop':
      stopTimer();
      break;
    case 'reset':
      resetTimer();
      break;
    case 'notify':
      self.registration.showNotification('Notification from SW', {
        body: 'This is a notification from the service worker!'
      })
        .then(() => console.log('Notification shown'))
        .catch((error) => console.log('Failed to show notification:', error));

      break;
    default:
      console.error('Unknown action:', action);
      break;
  }
});
