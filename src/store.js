import { configureStore } from '@reduxjs/toolkit';
import activeTasksReducer from './slices/activeTasksSlice';
import completedTasksReducer from './slices/completedTasksSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  activeTasks: activeTasksReducer,
  completedTasks: completedTasksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

for (let key in rootReducer) {
  persistedReducer[key] = persistReducer(persistConfig, rootReducer[key]);
}

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
