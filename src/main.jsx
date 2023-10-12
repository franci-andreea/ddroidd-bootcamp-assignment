import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.scss'
import Homepage from './pages/home/homepage';
import ApplicationForm from './pages/application_form/application_form';
import SuccessPage from './pages/application_form/success_page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Homepage></Homepage>,
  },
  {
    path: '/join-us',
    element: <ApplicationForm></ApplicationForm>
  },
  {
    path: '/success',
    element: <SuccessPage></SuccessPage>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
