import { useState } from 'react'
import { AppRoutes } from './routes';
import './App.css'
import { Provider } from 'react-redux';
import useBasketLocalStorage from './utils/hooks/useBasketLocalStorage';

function App() {
  useBasketLocalStorage();

  return (
    // <Provider store={store}>
      <AppRoutes />
    // </Provider>
  )
}

export default App;
