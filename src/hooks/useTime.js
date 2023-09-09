import { useDispatch, useSelector } from 'react-redux';
import { 
  increaseProductiveTime,
  increasePassionTime,
  increaseLeisureTime,
  resetProductiveTime,
  resetPassionTime,
  resetLeisureTime
} from '../slices/timeSlice';

import { 
    setTimeLeft,
    toggleRunning,
    setRunning,
    toggleProductivity,
    setSelectedEnjoymentItem,
    toggleAlarmPlaying,
    setProductivityTime,
    setEnjoymentTime
  } from '../slices/timerSlice';

export default function useTime() {
  const dispatch = useDispatch();

  const productiveTime = useSelector((state) => state.time.productiveTime);
  const passionTime = useSelector((state) => state.time.passionTime);
  const leisureTime = useSelector((state) => state.time.leisureTime);
  const timeLeft = useSelector((state) => state.timer.timeLeft);
  const isRunning = useSelector((state) => state.timer.isRunning);
  const isProductivity = useSelector((state) => state.timer.isProductivity);
  const selectedEnjoymentItem = useSelector((state) => state.timer.selectedEnjoymentItem);
  const isAlarmPlaying = useSelector((state) => state.timer.isAlarmPlaying);
  const productivityTime = useSelector((state) => state.timer.productivityTime);
  const enjoymentTime = useSelector((state) => state.timer.enjoymentTime);
  

  const addProductiveTime = (amount) => {
    dispatch(increaseProductiveTime(amount));
  };

  const addPassionTime = (amount) => {
    dispatch(increasePassionTime(amount));
  };

  const addLeisureTime = (amount) => {
    dispatch(increaseLeisureTime(amount));
  };

  const clearProductiveTime = () => {
    dispatch(resetProductiveTime());
  };

  const clearPassionTime = () => {
    dispatch(resetPassionTime());
  };

  const clearLeisureTime = () => {
    dispatch(resetLeisureTime());
  };

  const updateTimeLeft = (time) => {
    dispatch(setTimeLeft(time));
  };

  const toggleTimerRunning = () => {
    dispatch(toggleRunning());
  };

  const setTimerRunning = (status) => {
    dispatch(setRunning(status));
  };

  const toggleTimerProductivity = () => {
    dispatch(toggleProductivity());
  };

  const selectEnjoymentItem = (item) => {
    dispatch(setSelectedEnjoymentItem(item));
  };

  const toggleTimerAlarmPlaying = () => {
    dispatch(toggleAlarmPlaying());
  };

  const updateProductivityTime = (time) => {
    dispatch(setProductivityTime(time));
  };

  const updateEnjoymentTime = (time) => {
    dispatch(setEnjoymentTime(time));
  };

  return {
    productiveTime,
    passionTime,
    leisureTime,
    addProductiveTime,
    addPassionTime,
    addLeisureTime,
    clearProductiveTime,
    clearPassionTime,
    clearLeisureTime,
    timeLeft,
    isRunning,
    isProductivity,
    selectedEnjoymentItem,
    isAlarmPlaying,
    updateTimeLeft,
    toggleTimerRunning,
    setTimerRunning,
    toggleTimerProductivity,
    selectEnjoymentItem,
    toggleTimerAlarmPlaying,
    productivityTime,
    enjoymentTime,
    updateProductivityTime,
    updateEnjoymentTime,
  };
};
