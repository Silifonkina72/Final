import { Map } from '@pbe/react-yandex-maps';

export const MyMap = () => {
  return (
    <div>
      <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
    </div>
  );
};
