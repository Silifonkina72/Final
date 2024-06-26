import { useEffect, useState } from "react";
import { YMaps, withYMaps } from "@pbe/react-yandex-maps";
import axios from "axios";

export const calculateDistance = ({ ymaps, route }) => {
  const [routeLength, setRouteLength] = useState(null);

  const apiKey = `513313f4-6089-4a80-b442-af1d3277a73e`;

  useEffect(() => {
    let canceled = false;

    if (ymaps && ymaps.route) {
      ymaps.route(route).then((route) => {
        if (!canceled) {
          setRouteLength(route.getHumanLength().replace("&#160;", " "));
        }
      });
    }

    return () => {
      canceled = true;
    };
  }, [ymaps, ...route]);
  console.log('roooooooout', routeLength);
  return routeLength;
  // return routeLength ? (
  //   <p>
  //     The route from <strong>{route[0]}</strong> to <strong>{route[1]}</strong> is <strong>{routeLength}</strong> long
  //   </p>
  // ) : (
  //   <p>Loading route...</p>
  // );
};

const ConnectedLengthPrinter = withYMaps(calculateDistance, true, ['route']);

const Test = (address) => {
  console.log('>>>>>>>', typeof address);
  return (
      <ConnectedLengthPrinter route={['Россия, город Тюмень, улица Мельникайте, дом 10', address]} />
  );
};

export default Test;
