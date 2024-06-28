import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from "@chakra-ui/react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useStartEffectMdf } from "../../utils/hooks/useStartEffectMdf";
import { useStartEffect } from "../../utils/hooks/useStartEffect";
import { StainsThunk } from "../../store/thunkActions/StainThunk";
// interface Elements {
//   id: number;
//   priceArea: number;
//   priceVolume: number;
//   name: string;
//   number: number;
//   img: string;
//   model: string; // Добавьте это поле, если необходимо
// }

const AdminTable: React.FC = () => {
  // const [data, setData] = useState<Elements[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get<Elements[]>('http://localhost:3000/availability');
  //       setData(response.data);
  //     } catch (error) {
  //       console.error('Ошибка при получении данных', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  //? достаем данные

  useStartEffectMdf();
  const dispatch = useAppDispatch();
  const primerInsulators = useAppSelector(
    (store) => store.primerInsulatorSlice.primerInsulators
  );
  const paints = useAppSelector((store) => store.paintSlice.paints);
  const acrylicPrimers = useAppSelector(
    (store) => store.acrylicPrimerSlice.acrylicPrimers
  );

  const laks = useAppSelector((store) => store.lakSlice.laks);
  const grounds = useAppSelector((store) => store.groundSlice.grounds);
  const stains = useAppSelector((store) => store.stainSlice.stains);

  useEffect(() => {
    void dispatch(StainsThunk());
  }, []);

  const primerInsulatorsRes = primerInsulators
    .filter((el) => el.number < 15)
    .map((el) => ({ ...el, model: "грунтовка-изолятор" }));

  const paintsRes = paints
    .filter((el) => el.number < 15)
    .map((el) => ({ ...el, model: "краска" }));

  const acrylicPrimersRes = acrylicPrimers
    .filter((el) => el.number < 15)
    .map((el) => ({ ...el, model: "акриловый грунт" }));

  const laksRes = laks
    .filter((el) => el.number < 15)
    .map((el) => ({ ...el, model: "лак" }));

  const groundsRes = grounds
    .filter((el) => el.number < 15)
    .map((el) => ({ ...el, model: "грунт" }));

  const stainsRes = stains
    .filter((el) => el.number < 15)
    .map((el) => ({ ...el, model: "морилка" }));

  const data = [
    ...primerInsulatorsRes,
    ...paintsRes,
    ...acrylicPrimersRes,
    ...laksRes,
    ...groundsRes,
    ...stainsRes,
  ];

  const dataRes = data.sort((a, b) => a.number - b.number);

  return (
    <>
      <TableContainer border="1px solid black" margin="50px">
        <Heading as="h2" size="lg" textAlign="center" mb={4} color="teal">
          Количество оставшегося материала на складе:
        </Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Категория</Th>
              <Th>Наименование</Th>
              <Th>К-во на складе</Th>
              <Th>Фото</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataRes.map((item) => (
              <Tr key={item.id}>
                <Td>{item.model}</Td>
                <Td>{item.name}</Td>
                <Td>{item.number}</Td>
                <Td>
                  <img src={item.img} width={50} height={50} style={{ minHeight: '50px' }}  alt="Slide" />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminTable;
