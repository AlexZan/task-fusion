import { useDispatch, useSelector } from 'react-redux';
import { startAlarm, stopAlarm } from '../slices/timerSlice';

export const useAlarm = () => {
  const dispatch = useDispatch();
  const isAlarmPlaying = useSelector(state => state.timer.isAlarmPlaying);

  const startContinuousAlarm = () => {
    dispatch(startAlarm());  // Inform Redux to start the alarm
  };

  const stopContinuousAlarm = () => {
    dispatch(stopAlarm());  // Inform Redux to stop the alarm
  };

  return {
    startContinuousAlarm,
    stopContinuousAlarm,
    isAlarmPlaying,
  };
};

export default useAlarm;
