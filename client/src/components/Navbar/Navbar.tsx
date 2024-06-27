import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchLogOut, fetchLogin } from "../../store/thunkActions/thunkActions";
import { Suspense } from "react";
import {
  Modal,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Input,
  Text,
} from "@chakra-ui/react";

export const Navbar = () => {

  const isAdmin = () => user?.isAdmin ?? false;
  const isAuth = () => !!user?.logDone;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.logSlice.user); // Правильный путь к пользователю

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputs, setInputs] = useState({ login: "", password: "" });
  const [erer, setErer] = useState({text: ''})

  useEffect(() => {
    setErer({text: ''})
  }, []);

  useEffect(() => {
    if (isAuth() && isAdmin()) {
      navigate('/orders');
      
    //     setErer({text: ''})
      
    // } else {
     
    //     setErer({text: 'Введите корректный логин или пароль!'})
      
    }
  }, [user]);


  useEffect(() => {
    console.log(1);
    setInputs({ login: '', password: '' });
    console.log(2);
  }, [isModalOpen]);

  //? инпут значение

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const logoutHandler = async () => {
    try {
      await dispatch(fetchLogOut());
      navigate('./');
    } catch (error) {
      console.error("Ошибка при выходе из системы", error);
    }
  };

  const loginHandler = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setInputs({ login: "", password: "" });
    setErer({text: ''})
    setIsModalOpen(false);
  };

  

  

  const userNav = useAppSelector((state) => state.logSlice.user);
  const userLogin = userNav?.login;

  const handleFormSubmit = async (): Promise<void> => {
    await dispatch(fetchLogin(inputs));
    setInputs({ login: "", password: "" });
    console.log('*****', user);
    if (isAdmin()) {
      navigate('/orders');
    }
  };

  return (
    <>
      <div className={styles.navbar}>
        {isAuth() ? (
          isAdmin() ? (
            <>
              <div className={styles.leftLinks}>
                <div className={styles.leftLinks}>
                  Приветствую,
                  <span className={styles.userName}>{userLogin}!</span>
                </div>
                <Link className={styles.link} to="/changer">
                  Изменение
                </Link>
                <Link className={styles.link} to="/availability">
                  Остаток
                </Link>
                <Link className={styles.link} to="/orders">
                  Текущие заказы
                </Link>
              </div>

              <div className={styles.rightLinks}>
                <Link onClick={logoutHandler} className={styles.link} to="/">
                  Выйти
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className={styles.leftLinks}>
                <div className={styles.leftLinks}>
                  Приветствую,
                  <span className={styles.userName}>{userLogin}!</span>
                </div>

                <Link className={styles.link} to="/">
                  Главная
                </Link>
                <Link className={styles.link} to="/massiv">
                  Массив
                </Link>
                <Link className={styles.link} to="/mdf">
                  МДФ
                </Link>
                <Link className={styles.link} to="/basket">
                  Корзина
                </Link>
              </div>

              <div className={styles.rightLinks}>
                <Link onClick={logoutHandler} className={styles.link} to="/">
                  Выйти
                </Link>
              </div>
            </>
          )
        ) : (
          <>
            <div className={styles.leftLinks}>
              <Link className={styles.link} to="/">
                Главная
              </Link>
              <Link className={styles.link} to="/massiv">
                Массив
              </Link>
              <Link className={styles.link} to="/mdf">
                МДФ
              </Link>
            </div>
            <div className={styles.rightLinks}>
              <Link onClick={loginHandler} to="/" className={styles.link}>
                Войти
              </Link>
              <Link className={styles.link} to="/registration">
                Зарегистрироваться
              </Link>
            </div>
          </>
        )}
      </div>

      <Suspense fallback={<>Загрузка</>}>
        <Outlet />
      </Suspense>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Введите ваш логин и пароль</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <Text color="red.700">{user?.logErr}</Text> */}
            <Text color="red.700">{erer.text}</Text>
            <label>
              <input
                // ref={inputRef}
                style={{
                  margin: "10px",
                  borderColor: "black",
                  borderWidth: "2px",
                  borderRadius: "5px",
                }}
                type="text"
                name="login"
                placeholder="Введите логин"
                // id="exampleInputLogin1"
                onChange={changeHandler}
                value={inputs.login}
              />
              <input
                style={{
                  margin: "10px",
                  borderColor: "black",
                  borderWidth: "2px",
                  borderRadius: "5px",
                }}
                type="password"
                name="password"
                placeholder="Введите password"
                // id="exampleInputLogin1"
                onChange={changeHandler}
                value={inputs.password}
              />
            </label>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="center">
            <Button colorScheme="blue" mr={3} onClick={handleFormSubmit}>
              Войти
            </Button>
            <Button colorScheme="purple" mr={3} onClick={closeModal}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
