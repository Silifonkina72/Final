stain - морилка;
solvent - растворитель;
ground - грунт;
lak - лак;
primer_insulator - грунтовка-изолятор
paint - краска
high_grade - высокопробная
acrylic_primer - акриловый грунт
patina - патина


['массив'], ['мдф'], ['морилка'], ['растворитель'], ['грунт'], ['лак'],  ['грунтовка-изолятор'], ['краска'], ['высокопробная', 'краска'], ['акриловый'], ['патина'], ['технология', 'покраски']
режим работы, адреса

const responses = [
    { keywords: ['массив'], response: 'Если вы хотите придать древесине цвет, вам необходимо выбрать 3 компонента: морилка, грунт и лак. Если такой необходимости нет, то неохлдим грунт и лак.' },
    { keywords: ['мдф'], response: 'Если вы хотите придать поверхности эффект старения или изменения оттенка, вам необходимо будет выбрать 6 компонентов: грунт-изолятор, заполняющий грунт, краску, акриловый грунт, патину и лак. Если такой необходимости нет, то необходимо выбрать 3 компонента: грунт-изолятор, заполняющий грунт и краску.' },
    { keywords: ['морилка'], response: 'Морилка – это специальное средство для окрашивания древесины, которое придает ей желаемый оттенок.' },
    { keywords: ['растворитель'], response: 'Растворитель – это химическое вещество, используемое для разбавления красок и лаков.' },
    { keywords: ['грунт'], response: 'Грунт – это основное покрытие, наносимое на поверхность перед окончательной отделкой, чтобы обеспечить адгезию и защиту.' },
    { keywords: ['лак'], response: 'Лак – это прозрачное или окрашенное покрытие, наносимое на поверхность для защиты и придания блеска.' },
    { keywords: ['грунтовка-изолятор'], response: 'Грунтовка-изолятор – это специальная грунтовка, предназначенная для изоляции поверхностей от влаги или других веществ.' },
    { keywords: ['краска'], response: 'Краска – это материал, используемый для окрашивания поверхностей.' },
    { keywords: ['высокопробная'], response: 'Высокопробная краска – это краска, обладающая высокой степенью качества и устойчивости к внешним воздействиям.' },
    { keywords: ['акриловый'], response: 'Акриловый – это материал или покрытие на основе акрила, обычно обладающее хорошей стойкостью и эластичностью.' },
    { keywords: ['патина'], response: 'Патина – это специальное средство для придания поверхности эффекта старения или изменения оттенка.' },
    { keywords: ['технология', 'покраски'], response: 'Технология покраски – это процесс применения краски, включающий подготовку поверхности, выбор материалов и способов нанесения.' },
    { keywords: ['выбор', 'выбрать'], response: 'Какой материал вы хотите использовать в качестве покраски? МДФ или Массив?' },
    { keywords: ['режим', 'работы'], response: 'все наши филиалы работают с 10.00-20.00 по местному времени без перерыва на обед.' },
    { keywords: ['адрес', 'адреса'], response: 'Уеажите ваш город.' },
    { keywords: ['адрес', 'адреса'], response: 'Вот список адрессов филиала, находящихся в вашем городе:' },
  ];


  Если вам необходимо расчитать исходя из полщади, укажите сколько кв.м вам необходимо покрасить и нажмите кнопку 'посчитать по площади', а если вам необходим конкретный товар, тогда необходимо нажать кнопку 'посчитать по объему'


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
  } from "@chakra-ui/react";
  import KardMapVolume from "../../components/KardMapVolume/KardMapVolume";
  import KardMapSquare from "../../components/KardMapSquare/KardMapSquare";
  
  export default function Mdf() {
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    // const [input, setInput] = useState<number>(0);
    // const [boxVisible, setBoxVisible] = useState<boolean>(false);
    // const [boxVisible2, setBoxVisible2] = useState<boolean>(false);
    // const inputRef = useRef<HTMLInputElement | null>(null);
  
    // ? достаем данные для карусели
    // useStartEffectMdf();
    // const dispatch = useAppDispatch();
  
    // const { primerInsulators } = useAppSelector(
    //   (store) => store.primerInsulatorSlice.primerInsulators
    // );
    // const { paints } = useAppSelector((store) => store.paintSlice.paints);
    // const { acrylicPrimers } = useAppSelector(
    //   (store) => store.acrylicPrimerSlice.acrylicPrimers
    // );
    // const { patinas } = useAppSelector((store) => store.patinaSlice.patinas);
    // const { laks } = useAppSelector((store) => store.lakSlice.laks);
    // const { grounds } = useAppSelector((store) => store.groundSlice.grounds);
    // const { allPrice: itemPrice } = useAppSelector((state) => state.basketSlice);
  
    // // //? модальное окно
    // const closeModal = useCallback(() => {
    //   setIsOpen(false);
    // }, []);
  
    // const openModal = useCallback(() => {
    //   setIsOpen(true);
    //   setTimeout(() => {
    //     if (inputRef.current) {
    //       inputRef.current.focus();
    //       inputRef.current.setSelectionRange(0, 0);
    //     }
    //   }, 1);
    // }, [inputRef]);
  
    //! полная стоимость (по площади)
    const allCostMassiv = itemPrice.reduce((acc, el) => acc + el.priceArea, 0);
    const allPricesquareAnswer = useMemo(() => input * allCostMassiv, [input]);
  
    // //? инпут значение
    // const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    //   setInput(Number(e.target.value));
    // };
  
    // //? открываем все карточи по площади
    // const allSquareHandler = () => {
    //   setIsOpen(false);
    //   setBoxVisible(true);
    //   setBoxVisible2(false);
    //   //! разобраться с инпутом!!!
    //   //setInput({ answer: "" })
    // };
  
    // //? открываем все карточки по объему
    // const allVolumeHandler = () => {
    //   setIsOpen(false);
    //   setBoxVisible(false);
    //   setBoxVisible2(true);
    //};
  
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
  
    // const onKeyDownHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    //   if (isNaN(Number(e.key)) && e.key !== "Backspace") {
    //     e.preventDefault();
    //   }
    // }, []);
  
    return (
      <>
        <div>Mdf</div>
  
        <Karusel stains={primerInsulators} model={"PrimerInsulator"} />
        <br />
        <Karusel stains={paints} model={"Paint"} />
        <br />
        <Karusel stains={acrylicPrimers} model={"AcrylicPrimer"} />
        <br />
        <Karusel stains={patinas} model={"Patina"} />
        <br />
        <Karusel stains={laks} model={"Lak"} />
        <br />
        <Karusel stains={grounds} model={"Ground"} />
  
        {/* <Modal isOpen={isOpen} onClose={closeModal}>
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
   */}
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
        
      </>
    );
  }
  


  