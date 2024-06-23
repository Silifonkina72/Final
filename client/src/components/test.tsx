import { useEffect, useState } from 'react';
import { YMaps, withYMaps } from '@pbe/react-yandex-maps';
import axios from 'axios';

const calculateDistance = ({ ymaps, route }) => {
  const [routeLength, setRouteLength] = useState(null);

  useEffect(() => {
    let canceled = false;
    
    console.log('1',  ymaps.route);
    console.log('2',  Boolean(ymaps));

    if (ymaps && ymaps.route) {
      ymaps.route(route).then((route) => {
        console.log('****', route);
        
        if (!canceled) {
           
          setRouteLength(route.getHumanLength().replace('&#160;', ' '));
        }
      });
    }

    return () => {
      canceled = true;
    };
  }, [ymaps, ...route]);

  return routeLength ? (
    <p>
      The route from <strong>{route[0]}</strong> to <strong>{route[1]}</strong> is <strong>{routeLength}</strong> long
    </p>
  ) : (
    <p>Loading route...</p>
  );
};

const ConnectedLengthPrinter = withYMaps(calculateDistance, true, ['route']);

const Test = () => {
  return (
    
      <ConnectedLengthPrinter route={['Россия, город Тюмень, улица Мельникайте, дом 10', 'Россия, город Тюмень, улица Республики, дом 10']} />
   
  );
};

export default Test;
