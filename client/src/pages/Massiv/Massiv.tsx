import {
  ChangeEvent,
  useCallback,
  useMemo,
  KeyboardEvent,
  useRef,
} from "react";
import Karusel from "../../components/Karusel/Karusel";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useState } from "react";
import { addItemPrice } from '../../store/slices/basketSlice';
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
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
  Image,
  Text
} from "@chakra-ui/react";
import { FaRegSmile } from 'react-icons/fa';
import { Link } from 'react-router-dom'; 
import KardMapVolume from "../../components/KardMapVolume/KardMapVolume";
import KardMapSquare from "../../components/KardMapSquare/KardMapSquare";
import { useStartEffect } from "../../utils/hooks/useStartEffect";
import "../Mdf/mdfAndMassiv.css";

const Massiv = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<number>(null);
  const [boxVisible, setBoxVisible] = useState<boolean>(false);
  const [boxVisible2, setBoxVisible2] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isOpenReg, setIsOpenReg] = useState<boolean>(false);



  //? достаем данные для карусели

  useStartEffect();
  const dispatch = useAppDispatch();

  const { stains } = useAppSelector((store) => store.stainSlice);
  const { grounds } = useAppSelector((store) => store.groundSlice);
  const { laks } = useAppSelector((store) => store.lakSlice);
  const { allPrice: itemPrice } = useAppSelector((state) => state.basketSlice);

  //? модальное окно

  const user = useAppSelector((state) => state.logSlice.user); // Правильный путь к пользователю
  const isAdmin = () => user?.isAdmin ?? false;
  const isAuth = () => !!user?.logDone;

  const closeHendler = ()=> {
    setIsOpenReg(false)
  }

const closeModalReg = useCallback(() => {
    setIsOpenReg(false);
  }, []);


  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openModal = useCallback(() => {
    if (isAuth()) {
      setIsOpen(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(0, 0);
        }
      }, 1);
    } else {
      setIsOpenReg(true)
    }
   
  }, [inputRef]);

  //! полная стоимость (по площади)
  const allCostMassiv = itemPrice.reduce((acc, el) => acc + el.priceArea, 0);
  const allPricesquareAnswer = useMemo(() => input * allCostMassiv, [input]);

  //? инпут значение
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput(Number(e.target.value));
  };

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
    // if (isAuth()) {
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
    // } else {
    //   setIsOpenReg(true)
    // }
    
  };

  //? отправка в корзину товаров по колличеству (передача данных в itemsSquare, itemsVolume), очищаем allPrice
  const submitHandler2 = () => {
    // if (isAuth()) {
      const itemsVolume = itemPrice.map((item) => ({
        ...item,
        count: item.count ?? input,
      }));
  
      dispatch(addItemsVolume(itemsVolume));
      setBoxVisible2(false);
      dispatch(resetBasket());
    // } else {
    //   setIsOpenReg(true)
    // }
    
  };

  const onKeyDownHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (isNaN(Number(e.key)) && e.key !== "Backspace") {
      e.preventDefault();
    }
  }, []);

  const rowsStains = [];
  for (let i = 0; i < stains.length; i += 4) {
    rowsStains.push(stains.slice(i, i + 4));
  }


  const handleAddToBasket = (item, model) => {
    const { id, name, priceArea, priceVolume, img, number } = item;
    // console.log('ITEM', item);
    // console.log('MODEL', model);
    dispatch(
      addItemPrice({ model, id, name, priceArea, priceVolume, img, number })
    );
  }


  return (
    <>
     
        <Box className="textHeading">
          <div className="infoText">
            Если вы хотите придать древесине цвет, вам нужно выбрать 3
            компонента: морилка, грунт и лак. Если такой необходимости нет, то
            используйте грунт и лак.
          </div>
        </Box>

        <div className="containerComponent">
        <Box className="containerBox">
        <div>
          <Karusel stains={stains} model={"Stain"} />
        </div>
        <Box p={4} width="40%" minWidth="400px" minHeight="300px">
            <Table
              variant="simple"
              size="md"
              sx={{ borderCollapse: "collapse" }}
            >
              <Tbody>
                {rowsStains.map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {row.map((el, colIndex) => (
                      <Td
                        key={colIndex}
                        p={0}
                        border={0}
                        style={{ padding: "1px" }}
                      >
                        <button
                         onClick={() => handleAddToBasket(el, 'Stain' )}
                         className="buttonComponent">
                          {" "}
                          <img
                            src={el.img}
                            alt={`paint-${rowIndex}-${colIndex}`}
                            width="100px"
                            style={{ margin: "1px" }}
                          />
                        </button>
                      </Td>
                    ))}
                    {row.length < 5 &&
                      Array.from({ length: 5 - row.length }).map((_, index) => (
                        <Td
                          key={`empty-${index}`}
                          p={0}
                          border={0}
                          style={{ padding: "3px" }}
                        />
                      ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>

        <div className="textComponent">
          * Морилка – это специальное средство для окрашивания древесины, <br />{" "}
          которое придает ей желаемый оттенок.
        </div>
        <br />
        <Box className="containerBox">
        <div>
          <Karusel stains={grounds} model={"Ground"} />
        </div>
        <ol>
            {grounds.map((el) => (
              <li>
                <Button
                 fontSize={{ base: '12px', md: '16px', lg: '20px' }}
                 padding={{ base: '-2px', md: '12px', lg: '16px' }}
                 onClick={() => handleAddToBasket(el, 'Ground' )}
                className="buttonComponent">{el.name}</Button>
              </li>
            ))}
          </ol>
        
        </Box>

        <div className="textComponent">
          * Грунт – это основное покрытие, наносимое на поверхность <br />
          перед окончательной отделкой, чтобы обеспечить адгезию и защиту.
        </div>
        <br />

        <Box className="containerBox">
        <div>
          <Karusel stains={laks} model={"Lak"} />
        </div>
        <ol>
            {laks.map((el) => (
              <li>
                <Button
                 fontSize={{ base: '12px', md: '16px', lg: '20px' }}
                 padding={{ base: '-2px', md: '12px', lg: '16px' }}
                 onClick={() => handleAddToBasket(el, 'Lak' )}
                className="buttonComponent">{el.name}</Button>
              </li>
            ))}
          </ol>
        </Box>
        <div className="textComponent">
          * Лак – это прозрачное или окрашенное покрытие, наносимое на
          <br /> поверхность для защиты и придания блеска.
        </div>

        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Как вы хотите рассчитать стоимость? Исходя из площади или из
              объема?
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
                Посчитать по площади
              </Button>
              <Button colorScheme="teal" mr={3} onClick={allVolumeHandler}>
                Посчитать по объему
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Button 
        className="raschet"
        colorScheme="teal"
        width={200}
        onClick={openModal}
        >Рассчитать стоимость</Button>

<div className="containerKardMapSquare">
  <div className="oneComponentKardMapSquare">
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
          </div>

          <div className="twoComponentKardMapSquare">
        {boxVisible && (
          <>
            <div> 
              Итоговая стоимость составит: <span style={{ fontWeight: 'bold' }}>{allPricesquareAnswer}.руб</span> на {input}{" "}
              м.кв.
            </div>
            <Button
            bg="#693A69" 
            color="white" 
            _hover={{
              bg: '#7b1fa2', 
            }}
            _active={{
              transform: 'scale(1.1)', 
            }}
            transition="transform 0.2s, background-color 0.2s"
             className="buttonsubmitHandler" onClick={submitHandler}>Отложить в корзину</Button>
          </>
        )}
        </div>
</div>


<div className="containerKardMapVolume">

<div className="oneComponentKardMapVolume">
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
</div>

<div className="twoComponentKardMapVolume">
        {boxVisible2 && (
          <>
            <Button
             bg="#693A69" 
             color="white" 
             _hover={{
               bg: '#7b1fa2', 
             }}
             _active={{
               transform: 'scale(1.1)', 
             }}
             transition="transform 0.2s, background-color 0.2s"
            className="buttonBasket" onClick={submitHandler2}>Отложить в корзину</Button>
          </>
        )}
      </div>
</div>

      </div>

      <Modal isOpen={isOpenReg} onClose={closeModalReg}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display="flex" alignItems="center" justifyContent="center">
            <Icon as={FaRegSmile} boxSize={8} mr={2} />
            Регистрация
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box textAlign="center">
              <Image
                src="https://strojdvor.ru/wp-content/uploads/2021/07/e52308fe100d630158e7d5c28e3e93a1.png"
                alt="Reminder Image"
                mx="auto"
                mb={4}
                borderRadius="full"
              />
              <Text fontSize="xl" fontWeight="bold" mb={2}>
              Не забудьте зарегистрироваться!
              </Text>
              <Text color="gray.600">
              Зарегистрируйтесь прямо сейчас, чтобы получить доступ к эксклюзивным функциям и быть в курсе наших последних новостей и предложений.
              </Text>
            </Box>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="center">
            <Button colorScheme="teal" mr={3} onClick={closeHendler}>
              Закрыть
            </Button>
            <Button as={Link} to="/registration" colorScheme="blue">
              Зарегистрироваться сейчас
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {/* <Modal isOpen={isOpenReg} onClose={closeModalReg}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              REGISTRATION
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              
            </ModalBody>

            <ModalFooter display="flex" justifyContent="center">
              <Button colorScheme="blue" mr={3} onClick={closeHendler}>
                close
              </Button>
            
            </ModalFooter>
          </ModalContent>
        </Modal> */}


    </>
  );
};

export default Massiv;
