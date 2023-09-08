import React from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import TimerMode from './TimerMode';
import { TimeProvider } from './context/TimeContext';
import { store, persistor } from './store';
import Insights from './components/Insights';

function Header() {
  return (
    <div className="App theme-bg-darker min-h-screen theme-text-dark">
      <header className="text-center padding-small relative">
        <Link to="/">
          <img src={process.env.PUBLIC_URL + '/logo-thin.PNG'} alt="Logo" className="mx-auto w-1/2 max-w-xs" />
        </Link>
        <Link to="/insights" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-white">
          Insights
        </Link>
      </header>
      <Outlet />
    </div>
  );
}

const router = createBrowserRouter([
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



function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TimeProvider>
            <RouterProvider router={router}>
            </RouterProvider>
        </TimeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
