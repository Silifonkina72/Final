import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { protectedRouter } from './protected';
import { publicRouter } from './public';

interface AppRoutesProps {
    isAuth: boolean;
}

export function AppRoutes() {
    return <RouterProvider router={publicRouter}></RouterProvider>;
  }