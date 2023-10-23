import { playBeep } from '../../utils/audioUtils';  // Import the playBeep function

let beepInterval;  // This will hold our alarm interval
let audioContext;  // This will hold our shared AudioContext

const alarmMiddleware = store => next => action => {
  switch (action.type) {
    case 'timer/startAlarm':
      if (!beepInterval) {
        // Initialize the AudioContext if it doesn't exist
        if (!audioContext) {
          audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Immediately play the beep sound
        playBeep(audioContext);

        // Set up an interval to play the beep sound repeatedly
        beepInterval = setInterval(() => {
          playBeep(audioContext);
        }, 2000);  // Repeat every 2 seconds
      }
      break;

    case 'timer/stopAlarm':
      if (beepInterval) {
        clearInterval(beepInterval);
        beepInterval = null;
      }
      // Close the AudioContext when it's not needed to free up resources
      if (audioContext) {
        audioContext.close();
        audioContext = null;
      }
      break;

    default:
      break;
  }

  return next(action);  // Always return next(action) to pass the action to the next middleware or reducer
};

export default alarmMiddleware;
