import { useState } from 'react'
import { AppRoutes } from './routes';
import './App.css'
import { Provider } from 'react-redux';

function App() {
  return (
    // <Provider store={store}>
      <AppRoutes />
    // </Provider>
  )
}

export default App;
