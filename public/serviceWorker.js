// Declare a variable to store the current timer
let timerId = null;

// Function to start the timer
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
    default:
      console.error('Unknown action:', action);
      break;
  }
});
