import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Notification.requestPermission().then(function (permission) {
//   if (permission === 'granted') {
//     console.log('Notification permission granted.');
//     // You can now use the Notification API or the Push API
//   } else {
//     console.log('Unable to get permission to notify.');
//   }
// });

// navigator.serviceWorker.addEventListener('controllerchange', function () {
//   console.log('Controller changed');
// });


// navigator.serviceWorker.addEventListener('install', event => {
//   console.log('Service Worker installing.');
// });

// navigator.serviceWorker.addEventListener('activate', event => {
//   console.log('Service Worker activated.');
// });

// navigator.serviceWorker.addEventListener('controllerchange', event => {
//   console.log('Controller changed:', navigator.serviceWorker.controller);
// });

// Register the Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js').then((registration) => {
    // Registration was successful
    // console.log('ServiceWorker registration successful with scope: ', registration.scope);
    // Ensure the service worker takes over the page as soon as possible.
    return navigator.serviceWorker.ready;
  }).then(function (reg) {
    // console.log('Service Worker is ready :^)', reg);
    // Inform the service worker to take control ASAP
    if (reg.waiting) {
      reg.waiting.postMessage('skipWaiting');
    }
  }).catch((err) => {
    // registration failed :(
    // console.log('ServiceWorker registration failed: ', err);
  });
}



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
