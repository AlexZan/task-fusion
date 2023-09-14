import { playBeep } from '../../utils/audioUtils';  // Import the playBeep function

let beepInterval;  // This will hold our alarm interval

const alarmMiddleware = store => next => action => {
  switch (action.type) {
    case 'timer/startAlarm':
      if (!beepInterval) {
        // Immediately play the beep sound
        playBeep();

        // Set up an interval to play the beep sound repeatedly
        beepInterval = setInterval(() => {
          playBeep();
        }, 2000);  // Repeat every 2 seconds
      }
      break;

    case 'timer/stopAlarm':
      if (beepInterval) {
        clearInterval(beepInterval);
        beepInterval = null;
      }
      break;

    default:
      break;
  }

  return next(action);  // Always return next(action) to pass the action to the next middleware or reducer
};

export default alarmMiddleware;
