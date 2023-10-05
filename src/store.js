import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import activeTasksReducer from './slices/activeTasksSlice';
import completedTasksReducer from './slices/completedTasksSlice';
import repeatTasksReducer from './slices/repeatTasksSlice';
import activitiesReducer from './slices/activitiesSlice';
import timeTrackerReducer from './slices/timeTrackerSlice'
import timerReducer from './slices/timerSlice'

import alarmMiddleware from './components/Timer/alarmMiddleware'
import tickMiddleware from './components/Timer/tickMiddleware';
import repeatTasksMiddleware from './RepeatTasks/repeatTasksMiddleware'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['timer']
};

const timerPersistConfig = {
  key: 'timer',
  storage,
  blacklist: ['isAlarmPlaying']
};

const persistedTimerReducer = persistReducer(timerPersistConfig, timerReducer);


const rootReducer = combineReducers({
  activeTasks: activeTasksReducer,
  completedTasks: completedTasksReducer,
  repeatTasks: repeatTasksReducer,
  activities: activitiesReducer,
  time: timeTrackerReducer,
  timer: persistedTimerReducer,
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
  }).concat(alarmMiddleware, tickMiddleware, repeatTasksMiddleware)
});

const persistor = persistStore(store);

export { store, persistor };
