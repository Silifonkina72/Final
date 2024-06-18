import React from 'react';
import { useRouteError } from 'react-router-dom';

export function ErrorBoundary({ global }: { global?: boolean }) {
  const error = useRouteError();
  return (
    <div>
      <h1>{global ? 'Global Error' : 'Page Error'}</h1>
      <p>{error?.message || 'Something went wrong!'}</p>
    </div>
  );
}