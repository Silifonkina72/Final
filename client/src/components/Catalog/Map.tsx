import { Map, Placemark, YMaps, Polyline, ObjectManager, RouteButton } from "@pbe/react-yandex-maps";
import axios from "axios";
import { useEffect, useState } from "react";
import Test from "../test";

type placemarksData = {
  coords: number[];
};

type locationData = {
  center: Array<number>;
  zoom: number;
};

const MyMap = (): JSX.Element => {
  const addresses: string[] = [
    "Россия, город Тюмень, улица Мельникайте, дом 10",
    "Россия, город Тюмень, улица Республики, дом 10",
    "Россия, город Тюмень, улица Мелиораторов, дом 10",
  ];

  const [placemarks, setPlacemarks] = useState<placemarksData[]>([]);
  const [location, setLocation] = useState<locationData>({
    center: [55.75, 37.57],
    zoom: 9,
  });
  const [distance, setDistance] = useState<number | null>(null);

  useEffect(() => {
    const fetchCoordinates = async (addr: string): Promise<number[]> => {
      const apiKey = `513313f4-6089-4a80-b442-af1d3277a73e`;
      const response = await axios.get<{
        response: {
          GeoObjectCollection: {
            featureMember: {
              GeoObject: {
                Point: {
                  pos: string;
                };
              };
            }[];
          };
        };
      }>(
        `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${encodeURIComponent(
          addr
        )}`
      );

      //? Обработка ответа
      const coordinates =
        response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos
          .split(" ")
          .map(Number)
          .reverse(); // Преобразование координат

      return coordinates;
    };

    const getPlacemarks = async () => {
      const placemarks = await Promise.all(
        addresses.map(async (address: string) => {
          const coords = await fetchCoordinates(address);
          return { coords };
        })
      );
      setPlacemarks(placemarks);
    };

    getPlacemarks();
  }, []);


  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  useEffect(() => {
    // Проверка, поддерживает ли браузер API геолокации
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const { latitude, longitude } = position.coords;
          setLocation({ center: [latitude, longitude], zoom: 14 });
        },
        (error: GeolocationPositionError) => {
          console.error("Ошибка определения местоположения:", error);
        }
      );
    }
  }, []);

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




  return (
    <div>
      <Map
        defaultState={{ center: location.center, zoom: location.zoom }}
        width="500px"
        height="400px"
      >
        <Placemark
          geometry={location.center}
          properties={{ iconCaption: "Вы здесь" }}
          options={{ iconColor: "#ff0000" }}
        />
        {placemarks.map(({ coords }) => (
          <Placemark key={coords} geometry={coords} />
        ))}
      </Map>
    
    </div>
  );
};

export default MyMap;
