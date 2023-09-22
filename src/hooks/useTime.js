import { useDispatch, useSelector } from 'react-redux';
import { 
  increaseProductiveTime,
  increasePassionTime,
  increaseLeisureTime,
  resetAll
} from '../slices/timeTrackerSlice';

import { 
    setTimeLeft,
    toggleRunning,
    setRunning,
    toggleProductivity,
    setSelectedEnjoymentItem,
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
  const productivityDuration = useSelector((state) => state.timer.productivityDuration);
  const enjoymentDuration = useSelector((state) => state.timer.enjoymentDuration);

  const addProductiveTime = (amount) => {
    dispatch(increaseProductiveTime(amount));
  };

  const addPassionTime = (amount) => {
    dispatch(increasePassionTime(amount));
  };

  const addLeisureTime = (amount) => {
    dispatch(increaseLeisureTime(amount));
  };

  const resetDailyInsights = () => {
    dispatch(resetAll());
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
    timeLeft,
    isRunning,
    isProductivity,
    selectedEnjoymentItem,
    updateTimeLeft,
    toggleTimerRunning,
    setTimerRunning,
    toggleTimerProductivity,
    selectEnjoymentItem,
    productivityTime: productivityDuration,
    enjoymentTime: enjoymentDuration,
    updateProductivityTime,
    updateEnjoymentTime,
    resetDailyInsights,
  };
};
