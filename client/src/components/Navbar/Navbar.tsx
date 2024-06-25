import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchLogOut, fetchLogin } from "../../store/thunkActions/thunkActions";
import { Suspense } from "react";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.logSlice.user); // Правильный путь к пользователю

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;
    try {
      await dispatch(fetchLogin({ login, password })).unwrap();
      closeModal();
    } catch (err) {
      console.error("Failed to login:", err);
    }
    closeModal();
  };

  const isAdmin = () => user?.isAdmin ?? false;
  const isAuth = () => !!user;

  return (
    <>
      <div className={styles.navbar}>
        <Link className={styles.link} to="/">
          Тут будет название
        </Link>
        <Link className={styles.link} to='/massiv'>
          Массив
        </Link>
        {/* <div className={styles.title}></div> */}
        {isAuth() ? (
          isAdmin() ? (
            <>
            
              <Link className={styles.link} to="/changer">
                Изменение
              </Link>
              <Link className={styles.link} to="/availability">
                Наличие
              </Link>
              <Link className={styles.link} to="/orders">
                Заказы
              </Link>
              <button
                onClick={logoutHandler}
                className="btn btn-outline-dark me-2 p-2"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link className={styles.link} to="/basket">
                Корзина
              </Link>
              <button
                onClick={logoutHandler}
                className="btn btn-outline-dark me-2 p-2"
              >
                Выйти
              </button>
            </>
          )
        ) : (
          <>
            <button
              onClick={loginHandler}
              className="btn btn-outline-dark me-2 p-2"
            >
              Войти!
            </button>
            <Link className={styles.link} to="/registration">
              Зарегистрироваться
            </Link>
          </>
        )}
      </div>
      <Suspense fallback={<>Загрузка</>}>
        <Outlet />
      </Suspense>

      {isModalOpen && (
          <div className={styles.modalOverlay}>
          <dialog open style={{ borderRadius: "10px" }}>
            <div id="modal-box">
              <form className="logForm" onSubmit={handleFormSubmit}>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Закрыть"
                  onClick={closeModal}
                >
                  X
                </button>
                <h6 className="logErrMsg" />

                <div className="mb-30">
                  <input
                    name="login"
                    placeholder="Введите логин"
                    type="text"
                    className="form-control"
                    id="exampleInputLogin1"
                    aria-describedby="loginHelp"
                  />
                </div>
                <div className="mb-30">
                  <input
                    name="password"
                    placeholder="Введите пароль"
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                  <div id="passwordHelp" className="form-text">
                    Не забывайте пароль!
                  </div>
                </div>
                <button type="submit" className="btn btn-outline-light">
                  Отправить
                </button>
              </form>
            </div>
          </dialog>
        </div>
      )}
    </>
  );
};
