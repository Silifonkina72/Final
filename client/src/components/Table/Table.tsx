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
  useMediaQuery,
  Box,
  Image,
} from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useStartEffectMdf } from "../../utils/hooks/useStartEffectMdf";
import { StainsThunk } from "../../store/thunkActions/StainThunk";

const AdminTable: React.FC = () => {
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
  }, [dispatch]);

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

  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  return (
    <>
      <Box
        width={isLargerThan700 ? "80%" : "90vw"}
        margin="50px auto"
        border="1px solid black"
        borderRadius="lg"
        overflow="hidden"
      >
        <Heading
          as="h2"
          size={isLargerThan700 ? "lg" : "md"}
          textAlign="center"
          mb={4}
          color="teal"
          p={4}
        >
          Кол-во оставшегося материала на складе:
        </Heading>
        <TableContainer>
          <Table variant="simple" size={isLargerThan700 ? "md" : "sm"}>
            <Thead bg="gray.200">
              <Tr>
                <Th fontSize={isLargerThan700 ? "lg" : "sm"}>Категория</Th>
                <Th fontSize={isLargerThan700 ? "lg" : "sm"}>Наименование</Th>
                <Th fontSize={isLargerThan700 ? "lg" : "sm"}>К-во</Th>
                <Th fontSize={isLargerThan700 ? "lg" : "sm"}>Фото</Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataRes.map((item) => (
                <Tr key={item.id}>
                  <Td fontSize={isLargerThan700 ? "md" : "sm"}>{item.model}</Td>
                  <Td fontSize={isLargerThan700 ? "md" : "sm"}>{item.name}</Td>
                  <Td fontSize={isLargerThan700 ? "md" : "sm"}>{item.number}</Td>
                  <Td>
                    <Image
                      src={item.img}
                      width="50px"
                      height="50px"
                      objectFit="cover"
                      objectPosition="center"
                      alt="Slide"
                      borderRadius="md"
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AdminTable;
