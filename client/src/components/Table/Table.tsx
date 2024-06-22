import React, { useEffect, useState } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Heading } from '@chakra-ui/react';
import axios from 'axios';

interface Elements {
  id: number;
  priceArea: number;
  priceVolume: number;
  name: string;
  number: number;
  img: string;
  model: string; // Добавьте это поле, если необходимо
}

const AdminTable: React.FC = () => {
  const [data, setData] = useState<Elements[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Elements[]>('http://localhost:3000/availability');
        setData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных', error);
      }
    };
    fetchData();
  }, []);

  return (
    <TableContainer border="1px solid black" margin="50px">
      <Heading as="h2" size="lg" textAlign="center" mb={4} color="red">
        Кол-во оставшегося материала на складе:
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Наименование</Th>
            <Th>К-во на складе</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((item) => (
            <Tr key={item.id}>
              <Td>{item.name}</Td>
              <Td>{item.number}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default AdminTable;
