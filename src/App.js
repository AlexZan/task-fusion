import React, {useEffect} from 'react';
import { createHashRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import TimerMode from './TimerMode';
import Insights from './components/Insights';

function Header() {
  return (
    <div className="App theme-bg-darker min-h-screen theme-text-dark">
      <header className="text-center padding-small relative">
        <Link to="/">
          <img src={process.env.PUBLIC_URL + '/logo-thin.PNG'} alt="Logo" className="mx-auto w-1/2 max-w-xs" />
          Beta v0.1
        </Link>
        <Link to="/insights" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-white">
          Insights
        </Link>
      </header>
      <Outlet />
    </div>
  );
}

const router = createHashRouter([
  {
    element: <Header />,
    children: [
      {
        path: "/",
        element: <TimerMode />
      },
      {
        path: "/insights",
        element: <Insights />
      }
    ]
  }
]);

function MainApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'START_REPEAT_TASK_CHECK' });
  }, [dispatch]);

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  );
}


function App() {


  useEffect(() => {
    const currentState = store.getState();
    if (currentState.timer.isRunning) {
      store.dispatch({ type: 'timer/setRunning', payload: true });
    }
  }, []);

  // useEffect(() => {
  //   if (document.visibilityState === 'visible') {
  //     // The tab/app is active
  //     checkAndAddRepeatTasks();
  //   }
  // }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainApp />
      </PersistGate>
    </Provider>
  );
}

export default App;
