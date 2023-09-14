// tickMiddleware.js
import { startAlarm, setTimeLeft } from '../../slices/timerSlice';
import { increaseProductiveTime, increasePassionTime, increaseLeisureTime } from '../../slices/timeTrackerSlice'
import { updateActivityTimeSpent } from '../../slices/activitiesSlice';
import { updateTaskTimeSpent, updateTopTaskTimeSpentAction } from '../../slices/activeTasksSlice';

let tickInterval;
let accumulatedSeconds = 0;

const tickMiddleware = store => next => action => {
    switch (action.type) {
        case 'timer/setRunning':
            if (action.payload && !tickInterval) {
                let lastUpdateTime = Date.now();

                const tickFunction = () => {
                    const state = store.getState();
                    const { timeLeft, isProductivity, selectedEnjoymentItem, isAlarmPlaying } = state.timer;
                    const isFinished = () => timeLeft <= 0;

                    if (isFinished() && !isAlarmPlaying) {
                        store.dispatch(startAlarm());
                    }

                    const currentTime = Date.now();
                    const elapsedSecondsExact = (currentTime - lastUpdateTime) / 1000;
                    accumulatedSeconds += elapsedSecondsExact;

                    const wholeElapsedSeconds = Math.floor(accumulatedSeconds);
                    if (wholeElapsedSeconds > 0) {
                        accumulatedSeconds -= wholeElapsedSeconds;
                    }


                    const elapsedMinutes = wholeElapsedSeconds / 60;

                    if (!isProductivity && selectedEnjoymentItem) {
                        if (selectedEnjoymentItem.type === 'task') {
                            store.dispatch(increasePassionTime(elapsedMinutes));
                            store.dispatch(updateTaskTimeSpent({id: selectedEnjoymentItem.id, time: elapsedMinutes}));
                        } else if (selectedEnjoymentItem.type === 'activity') {
                            store.dispatch(increaseLeisureTime(elapsedMinutes));
                            store.dispatch(updateActivityTimeSpent({id: selectedEnjoymentItem.id, time: elapsedMinutes}));
                        }
                    }

                    if (isProductivity) {
                        store.dispatch(increaseProductiveTime(elapsedMinutes));
                        store.dispatch(updateTopTaskTimeSpentAction(elapsedMinutes));

                    }

                    const newTimeLeft = timeLeft - wholeElapsedSeconds;
                    store.dispatch(setTimeLeft(newTimeLeft));

                    lastUpdateTime = currentTime;
                };

                tickInterval = setInterval(tickFunction, 1000);
            } else if (!action.payload && tickInterval) {
                clearInterval(tickInterval);
                tickInterval = null;
            }
            break;

        default:
            break;
    }

    return next(action);
};

export default tickMiddleware;
