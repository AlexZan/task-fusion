import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import activeTasksReducer from './slices/activeTasksSlice';
import completedTasksReducer from './slices/completedTasksSlice';
import repeatTasksReducer from './slices/repeatTasksSlice';
import activitiesReducer from './slices/activitiesSlice';
import timeReducer from './slices/timeSlice'
import timerReducer from './slices/timerSlice'

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  activeTasks: activeTasksReducer,
  completedTasks: completedTasksReducer,
  repeatTasks: repeatTasksReducer,
  activities: activitiesReducer,
  time: timeReducer,
  timer: timerReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: true,
    immutableCheck: true,
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['persist/PERSIST']
      // You can also ignore certain paths:
      // ignoredPaths: ['some.path.to.ignore']
    }
  })
});

const persistor = persistStore(store);

export { store, persistor };
