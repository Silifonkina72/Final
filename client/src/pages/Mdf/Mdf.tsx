import {
  ChangeEvent,
  useCallback,
  useMemo,
  KeyboardEvent,
  useRef,
} from "react";
import { useState } from "react";
import Karusel from "../../components/Karusel/Karusel";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { useEffect } from "react";

import { useStartEffectMdf } from "../../utils/hooks/useStartEffectMdf";
import {
  addItemsSquare,
  addItemsVolume,
  resetBasket,
} from "../../store/slices/basketSlice";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
} from "@chakra-ui/react";
import KardMapVolume from "../../components/KardMapVolume/KardMapVolume";
import KardMapSquare from "../../components/KardMapSquare/KardMapSquare";

export default function Mdf() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<number>(0);
  const [boxVisible, setBoxVisible] = useState<boolean>(false);
  const [boxVisible2, setBoxVisible2] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  //? достаем данные для карусели
  useStartEffectMdf();
  const dispatch = useAppDispatch();

  const primerInsulators = useAppSelector(
    (store) => store.primerInsulatorSlice.primerInsulators
  );
  const paints = useAppSelector((store) => store.paintSlice.paints);
  const acrylicPrimers = useAppSelector(
    (store) => store.acrylicPrimerSlice.acrylicPrimers
  );
  const patinas = useAppSelector((store) => store.patinaSlice.patinas);
  const laks = useAppSelector((store) => store.lakSlice.laks);
  const grounds = useAppSelector((store) => store.groundSlice.grounds);
  const { allPrice: itemPrice } = useAppSelector((state) => state.basketSlice);

  //? инпут значение
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(Number(e.target.value));
  };

  // //? модальное окно
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpen(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(0, 0);
      }
    }, 1);
  }, [inputRef]);

  const onKeyDownHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.key)) && e.key !== "Backspace") {
      e.preventDefault();
    }
  }, []);

  //? открываем все карточи по площади
  const allSquareHandler = () => {
    setIsOpen(false);
    setBoxVisible(true);
    setBoxVisible2(false);
    //! разобраться с инпутом!!!
    //setInput({ answer: "" })
  };

  //? открываем все карточки по объему
  const allVolumeHandler = () => {
    setIsOpen(false);
    setBoxVisible(false);
    setBoxVisible2(true);
  };

  //? отправка в корзину товаров по площади (передача данных в itemsSquare, itemsVolume), очищаем allPrice
  const submitHandler = () => {
    const itemsSquare = itemPrice
      .filter((el, i, arr) => {
        const findIndex = arr.findIndex(
          (findElem) => findElem.id === el.id && findElem.name === el.name
        );
        return findIndex === i;
      })
      .map((el) => {
        const newEl = { ...el, square: input };
        return newEl;
      });

    dispatch(addItemsSquare(itemsSquare));
    setBoxVisible(false);
    dispatch(resetBasket());
    // localStorage.removeItem('basketItemsPrice');
  };

  //? отправка в корзину товаров по колличеству (передача данных в itemsSquare, itemsVolume), очищаем allPrice
  const submitHandler2 = () => {
    const itemsVolume = itemPrice.map((item) => ({
      ...item,
      count: item.count ?? input,
    }));

    dispatch(addItemsVolume(itemsVolume));
    setBoxVisible2(false);
    dispatch(resetBasket());
  };

  //! полная стоимость (по площади)
  const allCostMassiv = itemPrice.reduce((acc, el) => acc + el.priceArea, 0);
  const allPricesquareAnswer = useMemo(() => input * allCostMassiv, [input]);
  console.log("++++++", primerInsulators);

  const rows = [];
  for (let i = 0; i < paints.length; i += 9) {
    rows.push(paints.slice(i, i + 9));
  }

  return (
    <>
      <div>Mdf</div>

      <Karusel stains={primerInsulators} model={"PrimerInsulator"} />

      <Box p={4} width="40%">
        <Table variant="simple" size="md">
          <Tbody>
            <Tr>
              {primerInsulators.map((el) => (
                <Td>
                  <img src={el.img} alt="el" width="100px" />
                </Td>
              ))}
            </Tr>
          </Tbody>
        </Table>
      </Box>

      <br />

      <Karusel stains={paints} model={"Paint"} />

      <Box p={4} width="40%" mx="auto">
        <Table variant="simple" size="md" sx={{ borderCollapse: 'collapse' }}>
          <Tbody>
            {rows.map((row, rowIndex) => (
              <Tr key={rowIndex}>
                {row.map((el, colIndex) => (
                  <Td key={colIndex} p={0} border={0} style={{ padding: '3px' }}>
                    <img src={el.img} alt={`paint-${rowIndex}-${colIndex}`} width="100px" style={{ margin: '3px' }} />
                  </Td>
                ))}
                {row.length < 5 &&
                  Array.from({ length: 5 - row.length }).map((_, index) => (
                    <Td key={`empty-${index}`} p={0} border={0} style={{ padding: '3px' }} />
                  ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <br />
      <Karusel stains={acrylicPrimers} model={"AcrylicPrimer"} />
      <br />
      <Karusel stains={patinas} model={"Patina"} />
      <br />
      <Karusel stains={laks} model={"Lak"} />
      <br />
      <Karusel stains={grounds} model={"Ground"} />

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Как вы хотите расчитать стоимость? Исходя из площади или из объема?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label>
              Укажите площадь и нажмите посчитать по{" "}
              <span style={{ color: "purple", fontWeight: "bold" }}>
                площади
              </span>{" "}
              или нажмите посчитать по{" "}
              <span style={{ color: "purple", fontWeight: "bold" }}>
                объему
              </span>
              <input
                ref={inputRef}
                style={{
                  margin: "10px",
                  borderColor: "black",
                  borderWidth: "2px",
                  borderRadius: "5px",
                }}
                type="text"
                name="answer"
                placeholder="укажите вашу площадь"
                onKeyDown={onKeyDownHandler}
                onChange={changeHandler}
                value={input}
              />
            </label>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="center">
            <Button colorScheme="blue" mr={3} onClick={allSquareHandler}>
              посчитать по площади
            </Button>
            <Button colorScheme="teal" mr={3} onClick={allVolumeHandler}>
              посчитать по объему
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button onClick={openModal}>рассчитать стоимость</Button>

      {boxVisible &&
        itemPrice.map((item) => (
          <KardMapSquare
            id={item.id}
            img={item.img}
            model={item.model}
            name={item.name}
            priceArea={item.priceArea}
          />
        ))}
      {boxVisible && (
        <>
          <div>
            Итоговая стоимость составит {allPricesquareAnswer}.руб на {input}{" "}
            м.кв.
          </div>
          <Button onClick={submitHandler}>отложить в корзину</Button>
        </>
      )}

      {boxVisible2 &&
        itemPrice.map((item) => (
          <KardMapVolume
            id={item.id}
            img={item.img}
            model={item.model}
            name={item.name}
            priceVolume={item.priceVolume}
          />
        ))}

      {boxVisible2 && (
        <>
          <Button onClick={submitHandler2}>отложить в корзину</Button>
        </>
      )}

      <Box p={4} width="40%">
        <Table variant="simple" size="md">
          <Tbody>
            <Tr>
              <Td>Data 1</Td>
              <Td>Data 2</Td>
              <Td>Data 3</Td>
              <Td>Data 4</Td>
              <Td>Data 5</Td>
            </Tr>
            <Tr>
              <Td>Data 6</Td>
              <Td>Data 7</Td>
              <Td>Data 8</Td>
              <Td>Data 9</Td>
              <Td>Data 10</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </>
  );
}
