import { Map, Placemark } from '@pbe/react-yandex-maps';

export const MyMap = () => {
  return (
    <div>
      <Map defaultState={{ center: [56.837993, 60.597393], zoom: 9 }} >
      <Placemark geometry={[55.684758, 37.738521]} />
      </Map>
    </div>
  );
};
