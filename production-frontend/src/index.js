import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './components/Landing';
import NewProduction from "./components/production/NewProduction";
import NewRessource from './components/production/NewRessource';
import { Provider } from 'react-redux';
import { store } from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([

  {
    path: "/",
    element: <Landing />,
  },
  {
    path: "/createproductionline",
    element: <NewProduction />
  },
  {
    path: "/createstation",
    element: <NewRessource />
  }
]);


root.render(
  <React.StrictMode>
    <Provider store={store} >
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
