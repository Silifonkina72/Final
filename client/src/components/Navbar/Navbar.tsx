import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './navbar.module.css';
import { Suspense } from 'react';

export const Navbar = () => {
  const navigate = useNavigate();

  // тут надо добавить функции проверки

  const isAdmin = () => true;
  const isAuth = () => true;

  return (
    <>
      <div className={styles.navbar}>
        <Link className={styles.link} to='/'>
          Тут будет название
        </Link>
        {/* <div className={styles.title}></div> */}
        {isAuth() ? (
          isAdmin() ? (
            <>
              <Link className={styles.link} to='/admin/availability'>
                Наличие
              </Link>
              <Link className={styles.link} to='/logout'>
                Выйти
              </Link>
            </>
          ) : (
            <>
              <Link className={styles.link} to='/basket'>
                Корзина
              </Link>
              <Link className={styles.link} to='/logout'>
                Выйти
              </Link>
            </>
          )
        ) : (
          <>
            <Link className={styles.link} to='/login'>
              Войти
            </Link>
            <Link className={styles.link} to='/reg'>
              Зарегистрироваться
            </Link>
          </>
        )}
      </div>
      <Suspense fallback={<>Загрузка</>}>
        <Outlet />
      </Suspense>
    </>
  );
};
