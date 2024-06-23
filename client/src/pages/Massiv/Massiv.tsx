import { ChangeEvent, useCallback, useMemo, KeyboardEvent,  useRef } from "react";
import Karusel from "../../components/Karusel/Karusel";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { StainsThunk } from "../../store/thunkActions/StainThunk";
import { useEffect } from "react";
import { GroundThunk } from "../../store/thunkActions/groundThunk";
import { LakThunk } from "../../store/thunkActions/lakThunk";
import { useState } from 'react';


import {
  ProductVolume,
  addItemsSquare,
  addItemsVolume,
  resetBasket,
} from '../../store/slices/basketSlice';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import KardMapVolume from "../../components/KardMapVolume/KardMapVolume";
import KardMapSquare from '../../components/KardMapSquare/KardMapSquare'
import { useStartEffect } from '../../utils/hooks/useStartEffect';

const Massiv = () => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<number>(0);
  const [boxVisible, setBoxVisible] = useState<boolean>(false);
  const [boxVisible2, setBoxVisible2] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);


  //? достаем данные для карусели
  useEffect(() => {
    void dispatch(StainsThunk());
  }, []);

  const dispatch = useAppDispatch();

  const { stains } = useAppSelector((store) => store.stainSlice);
  const { grounds } = useAppSelector((store) => store.groundSlice);
  const { laks } = useAppSelector((store) => store.lakSlice);
  const { allPrice: itemPrice } = useAppSelector((state) => state.basketSlice);

  //? достаем данные для карусели
  useStartEffect();

  //? модальное окно
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

  //? это массивы из хранилища

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

  //? отправка в корзину (передача данных в itemsSquare, itemsVolume), очищаем allPrice
  const submitHandler2 = () => {
    const itemsVolume = itemPrice.map((item) => ({
      ...item,
      count: item.count ?? input,
    }));

    dispatch(addItemsVolume(itemsVolume));
    setBoxVisible2(false);
    dispatch(resetBasket());
  };

  const onKeyDownHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.key)) && e.key !== 'Backspace') {
      e.preventDefault();
    }
  }, []);

  return (
    // <div className={styles.page}>
    <div >
      <div>Massiv</div>

      <Karusel stains={stains} model={'Stain'} />
      <br />
      <Karusel stains={grounds} model={'Ground'} />
      <br />
      <Karusel stains={laks} model={'Lak'} />

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
                ref={inputRef}
                style={{
                  margin: '10px',
                  borderColor: 'black',
                  borderWidth: '2px',
                  borderRadius: '5px',
                }}
                type='text'
                name='answer'
                onKeyDown={onKeyDownHandler}
                onChange={changeHandler}
                value={input}
              />
            </label>
          </ModalBody>
          <ModalFooter display='flex' justifyContent='center'>
            <Button colorScheme='blue' mr={3} onClick={allSquareHandler}>
              посчитать по площади
            </Button>
            <Button colorScheme='teal' mr={3} onClick={allVolumeHandler}>
              посчитать по объему
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <button onClick={openModal}>рассчитать стоимость</button>

      {boxVisible &&
        itemPrice.map((item) => (


         <KardMapSquare id={item.id} img={item.img} model={item.model} name={item.name} priceArea={item.priceArea} />

        ))}
      {boxVisible && (
        <>
          <div>
            Итоговая стоимость составит {allPricesquareAnswer}.руб на {input}{' '}
            м.кв.
          </div>
          <Button onClick={submitHandler}>отложить в корзину</Button>
        </>
      )}

      {boxVisible2 &&
        itemPrice.map((item) => (
          <KardMapVolume id={item.id} img={item.img} model={item.model} name={item.name} priceVolume={item.priceVolume} /> ))}
{/* 
         (itemPrice as ProductVolume[]).map((item) => (
           <KardVolume key={`${item.id}-${item.name}`} productVolume={item} />
         ))} */}

      {boxVisible2 && (
        <>
          <div>
            Итоговая стоимость составит {allPricesquareAnswer}.руб на {input}{' '}
            м.кв.
          </div>
          <Button onClick={submitHandler2}>отложить в корзину</Button>
        </>
      )}
    </div>
  );
};

export default Massiv;
