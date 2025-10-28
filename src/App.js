import React, { useEffect } from 'react';
import { createHashRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import ReactGA4 from "react-ga4";
import packageJson from '../package.json';

import TimerMode from './TimerMode';
import Insights from './components/Insights';

ReactGA4.initialize('G-0RFS7K47D2');

function Header() {
  return (
<header className="text-center padding-small relative flex justify-center items-center">
  <img src={'/icon.png'} alt="Logo" className="w-20 h-20 mr-2" />
  <div>
    <h1 className="text-4xl font-light text-white" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
      TaskTick
      <span className="text-xs text-gray-500 ml-2 opacity-50" style={{ verticalAlign: 'super' }}>Beta v{packageJson.version}</span>
    </h1>
    <p className="text-gray-500">Your Personal Productivity Partner</p>
  </div>
  <Link to="/insights" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-white">
    Insights
  </Link>
</header>


  );
}

const router = createHashRouter([
  {
    element: <MainApp />,
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

  React.useEffect(() => {
    ReactGA4.send('pageview');
  }, []);

  return (
    <div className="min-h-screen theme-text-dark min-h-screen" style={{
      background: 'radial-gradient(circle, #121826 60%, #0e2138 100%)'
    }}>
      <Header />
      <Outlet />
    </div>
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
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
