import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { YMaps, withYMaps } from "@pbe/react-yandex-maps";
const apiKey = `513313f4-6089-4a80-b442-af1d3277a73e`;


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
     <ChakraProvider>
     <YMaps query={{
              load: "package.full",
              apikey: apiKey
            }}>

    <App />
    </YMaps>
    </ChakraProvider>
 </Provider>
)
