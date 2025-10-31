import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
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

// Create a noop storage for SSR or when localStorage is not available
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// Simple localStorage wrapper that doesn't require event listeners
const createSimpleStorage = () => {
  return {
    getItem: (key) => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          return Promise.resolve(window.localStorage.getItem(key));
        }
      } catch (e) {
        console.warn('Error getting item from localStorage:', e);
      }
      return Promise.resolve(null);
    },
    setItem: (key, value) => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem(key, value);
        }
      } catch (e) {
        console.warn('Error setting item in localStorage:', e);
      }
      return Promise.resolve();
    },
    removeItem: (key) => {
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.removeItem(key);
        }
      } catch (e) {
        console.warn('Error removing item from localStorage:', e);
      }
      return Promise.resolve();
    },
  };
};

const storage = createSimpleStorage();

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
