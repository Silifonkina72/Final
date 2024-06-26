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
  Heading,
} from "@chakra-ui/react";
import KardMapVolume from "../../components/KardMapVolume/KardMapVolume";
import KardMapSquare from "../../components/KardMapSquare/KardMapSquare";
import "./mdfAndMassiv.css";

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

  console.log('!!!!', patinas);
  
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

  const rows = [];
  for (let i = 0; i < paints.length; i += 9) {
    rows.push(paints.slice(i, i + 9));
  }

  const rowsPatina = [];
  for (let i = 0; i < patinas.length; i += 4) {
    rowsPatina.push(patinas.slice(i, i + 4));
  }

  console.log("????? ", acrylicPrimers);

  return (
    <>
      <Box className="textHeading">
        <div>
          Если вы хотите придать поверхности эффект старения или изменения
          оттенка, вам необходимо будет выбрать 6 компонентов: грунт-изолятор,
          заполняющий грунт, краску, акриловый грунт, патину и лак. Если такой
          необходимости нет, то необходимо выбрать 3 компонента: грунт-изолятор,
          заполняющий грунт и краску.
        </div>
      </Box>

      <div className="containerComponent">
        <Box className="containerBox">
          <div>
            <Karusel stains={primerInsulators} model={"PrimerInsulator"} />
          </div>

          <ol>
            {primerInsulators.map((el) => (
              <li>
                <Button>{el.name}</Button>
              </li>
            ))}
          </ol>
        </Box>

        <div className="textComponent">
          * Грунтовка-изолятор – это специальная грунтовка, предназначенная для{" "}
          <br /> изоляции поверхностей от влаги или других веществ.
        </div>
        <br />

        <Box className="containerBox">
          <div>
            <Karusel stains={paints} model={"Paint"} />
          </div>
          <Box p={4} width="40%" minWidth="400px" minHeight="300px">
            <Table
              variant="simple"
              size="md"
              sx={{ borderCollapse: "collapse" }}
            >
              <Tbody>
                {rows.map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {row.map((el, colIndex) => (
                      <Td
                        key={colIndex}
                        p={0}
                        border={0}
                        style={{ padding: "1px" }}
                      >
                        <button>
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
          * Краска – это материал, используемый для окрашивания поверхностей.
          <br />У нас предоставлено более 50 видов краски.
        </div>

        <br />
        <Box className="containerBox">
          <div>
            <Karusel stains={acrylicPrimers} model={"AcrylicPrimer"} />
          </div>
          <ol>
            {acrylicPrimers.map((el) => (
              <li>
                <Button>{el.name}</Button>
              </li>
            ))}
          </ol>
        </Box>
        <div className="textComponent">
          * Акриловый грунт – это материал или покрытие на основе акрила, <br />
          обычно обладающее хорошей стойкостью и эластичностью.
        </div>
        <br />

        <Box className="containerBox">
          <div>
            <Karusel stains={patinas} model={"Patina"} />
          </div>
          <Box p={4} width="40%" minWidth="400px" minHeight="150px" sx={{ alignSelf: "center" }}>
            <Table
              variant="simple"
              size="md"
              // sx={{ borderCollapse: "collapse" }}
            >
              <Tbody>
                {rowsPatina.map((row, rowIndex) => (
                  <Tr key={rowIndex}>
                    {row.map((el, colIndex) => (
                      <Td
                        key={colIndex}
                        p={0}
                        border={0}
                        style={{ padding: "1px" }}
                      >
                        <button>
                          {" "}
                          <img
                            src={el.img}
                            alt={`paint-${rowIndex}-${colIndex}`}
                            width="900px"
                            style={{ margin: "0,5 px" }}
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
                          style={{ padding: "1px" }}
                        />
                      ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
        <div className="textComponent">
          * Патина – это специальное средство для придания поверхности
          <br />
          эффекта старения или изменения оттенка.
        </div>
        <br />

        <Box className="containerBox">
          <div>
            <Karusel stains={laks} model={"Lak"} />
          </div>
          <ol>
            {laks.map((el) => (
              <li>
                <Button>{el.name}</Button>
              </li>
            ))}
          </ol>
        </Box>
        <div className="textComponent">
          * Лак – это прозрачное или окрашенное покрытие, наносимое на
          <br /> поверхность для защиты и придания блеска.
        </div>
        <br />

        <Box className="containerBox">
          <div>
            <Karusel stains={grounds} model={"Ground"} />
          </div>
          <ol>
            {grounds.map((el) => (
              <li>
                <Button>{el.name}</Button>
              </li>
            ))}
          </ol>
        </Box>
        <div className="textComponent">
          * Грунт – это основное покрытие, наносимое на поверхность <br />
          перед окончательной отделкой, чтобы обеспечить адгезию и защиту.
        </div>

        <Modal isOpen={isOpen} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              Как вы хотите расчитать стоимость? Исходя из площади или из
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
                посчитать по площади
              </Button>
              <Button colorScheme="teal" mr={3} onClick={allVolumeHandler}>
                посчитать по объему
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


        <Button
          className="raschet"
          colorScheme="teal"
          width={200}
          onClick={openModal}
        >
          рассчитать стоимость
        </Button>

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
      </div>
    </>
  );
}
