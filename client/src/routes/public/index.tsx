import React from 'react';
import { RouteObject, useRoutes, createBrowserRouter } from 'react-router-dom';
import { Navbar } from '../../components/Navbar/Navbar';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import  Catalog  from '../../pages/Catalog/Catalog';
import Basket from '../../pages/Basket/Basket';
import Massiv from '../../pages/Massiv/Massiv';
import Login from '../../components/RegBar/RegBar';

import AdminPage from '../../pages/adminPage/AdminPage';
import Registration from '../../pages/Registration/Registration';
import Mdf from '../../pages/Mdf/Mdf';
import AcrylicPrimersList from '../../components/Exist/Exist';
import Change from '../../pages/adminPage/Change';


const PublicRouteObject: RouteObject[] = [
  {
    element: <Navbar />,
    errorElement: <ErrorBoundary global={true} />,
    children: [
      {
        path: '/',
        index: true,
        element: <Catalog />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/login',
        index: true,
        element: <Login user={false} />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/registration',
        index: true,
        element: <Registration />,
        errorElement: <ErrorBoundary />,
      },
     
      {
        path: 'basket',
        element: <Basket />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'massiv',
        element: <Massiv />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/availability',
        element: <AdminPage />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '/changer',
        index: true,
        element: <Change />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: 'mdf',
        element: <Mdf />,
        errorElement: <ErrorBoundary />,
      },
      {
        path: '*',
        element: <>NotFound </>,
      },
    ],
  },
];

export const publicRouter = createBrowserRouter(PublicRouteObject);