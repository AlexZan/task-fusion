import { useSelector, useDispatch } from 'react-redux';
import { addActivity, removeActivity, updateActivityTimeSpent } from '../slices/activitiesSlice';

export const useActivities = () => {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);

  const selectActivityById = (id) => {
    return activities.find((activity) => activity.id === id);
  };

  const boundActions = {
    addActivity: (name) => dispatch(addActivity(name)),
    removeActivity: (id) => dispatch(removeActivity(id)),
    updateActivityTimeSpent: (id, time) => dispatch(updateActivityTimeSpent({ id, time })),
  };

  return { activities, selectActivityById, ...boundActions };
};
