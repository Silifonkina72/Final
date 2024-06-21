import React, { ChangeEvent, useCallback, useMemo } from "react";
import { useState } from "react";
import Karusel from "../../components/Karusel/Karusel";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { StainsThunk } from "../../store/thunkActions/StainThunk";
import { useEffect } from "react";
import { GroundThunk } from "../../store/thunkActions/groundThunk";
import { LakThunk } from "../../store/thunkActions/lakThunk";
import {
  addItemsSquare,
  addItemsVolume,
  addItemPrice,
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
  Box,
  Image,
  Badge,
  Flex,
} from "@chakra-ui/react";
import KardMap from "../../components/KardMap/KardMap";

const Massiv = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState(0);
  const [boxVisible, setBoxVisible] = useState(false);
  const [boxVisible2, setBoxVisible2] = useState(false);

  // //? счетчик
  // const [count, setCount] = useState(0);
  // const handleIncrement = () => setCount(count + 1);
  // const handleDecrement = () => setCount(count - 1);


  //? достаем данные для карусели
  useEffect(() => {
    void dispatch(StainsThunk());
  }, []);

  const dispatch = useAppDispatch();
  const stains = useAppSelector((store) => store.stainSlice.stains);

  useEffect(() => {
    void dispatch(GroundThunk());
  }, []);

  const grounds = useAppSelector((store) => store.groundSlice.grounds);

  useEffect(() => {
    void dispatch(LakThunk());
  }, []);
  const laks = useAppSelector((store) => store.lakSlice.laks);

  //? модальное окно
  const closeModal = useCallback(() => setIsOpen(false), []);

  const openModal = useCallback(() => setIsOpen(true), []);

  //? это массивы из хранилища
  const {
    itemsSquare,
    itemsVolume,
    allPrice: itemPrice,
  } = useAppSelector((state) => state.basketSlice);

  //! полная стоимость (по площади)
  const allCostMassiv = itemPrice.reduce((acc, el) => acc + el.priceArea, 0);
  const allPricesquareAnswer = useMemo(() => input * allCostMassiv, [input]);


//? инпут значение
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(Number(e.target.value));
  };

  //? открываем все карточи (которые по площади)
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

  //? отправка в корзину (передача данных в itemsSquare, itemsVolume), очищаем allPrice
  const submitHandler = () => {
    //console.log("******", itemPrice);
    const objSquare = {'square': input}
    dispatch(addItemsSquare(itemPrice));
    dispatch(addItemsSquare(objSquare));

    setBoxVisible(false);
    dispatch(resetBasket());
    localStorage.removeItem("basketItemsPrice");
  };

  //? отправка в корзину (передача данных в itemsSquare, itemsVolume), очищаем allPrice
  const submitHandler2 = () => {
   
   //console.log("******", itemPrice);
   dispatch(addItemsVolume(itemPrice));
    setBoxVisible2(false);
    dispatch(resetBasket());
    localStorage.removeItem("basketItemsPrice");
  };



  return (
    <>
      <div>Massiv</div>
      <Karusel arr={stains} model={"Stain"} />
      <br />
      <Karusel arr={grounds} model={"Ground"} />
      <br />
      <Karusel arr={laks} model={"Lak"} />

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Как вы хотите расчитать стоимость? Исходя из площади или из объема?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label>
              Укажите площадь которая вам требуеться (м.кв) либо объем (м.куб)
              на 1ед. товара :
              <input
                style={{
                  margin: "10px",
                  borderColor: "black",
                  borderWidth: "2px",
                  borderRadius: "5px",
                }}
                type="number"
                name="answer"
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
      <button onClick={openModal}>рассчитать стоимость</button>

      {boxVisible &&
        itemPrice.map((item) => (
          <Box
            key={`${item.model}-${item.id}`}
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            mb="4"
          >
            <Flex>
              <Image
                src={item.img}
                alt="Card image"
                boxSize="174px"
                objectFit="cover"
              />

              <Box p="6">
                <Box d="flex" alignItems="baseline">
                  <Badge borderRadius="full" px="2" colorScheme="teal">
                    {item.model}
                  </Badge>
                </Box>

                <Box
                  mt="1"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                  {item.name}
                </Box>
                <Box>
                  {item.priceArea} руб/м.кв
                  <Box as="span" color="gray.600" fontSize="sm"></Box>
                </Box>

                <Box d="flex" mt="2" alignItems="center"></Box>
              </Box>
            </Flex>
          </Box>
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
          <KardMap id={item.id} img={item.img} model={item.model} name={item.name} priceVolume={item.priceVolume} />

        ))}

      {boxVisible2 && (
        <>
          <div>
            Итоговая стоимость составит {allPricesquareAnswer}.руб на {input}{" "}
            м.кв.
          </div>
          <Button onClick={submitHandler2}>отложить в корзину</Button>
        </>
      )}
    </>
  );
};

export default Massiv;
