import React, { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { fetchLogOut, fetchLogin } from "../../store/thunkActions/thunkActions";
import styles from "./RegBar.module.css";
import { Link } from "react-router-dom";

export default function Login({ user }) {
  console.log(user);

  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      await dispatch(fetchLogOut());
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
    const login = formData.get("login");
    const password = formData.get("password");
    console.log("Login:", login, "Password:", password);
    try {
      await dispatch(fetchLogin({ login, password })).unwrap();
      closeModal();
    } catch (err) {
      console.error("Failed to login:", err);
    }
    closeModal();
  };

  return (
    <>
      {!user?.length && (
        <>
          <button
            onClick={loginHandler}
            className="btn btn-outline-dark me-2 p-2"
          >
            Login
          </button>
        </>
      )}

      {!!user?.length && (
        <>
          <button
            onClick={logoutHandler}
            className="btn btn-outline-dark me-2 p-2"
          >
            Logout
          </button>
        </>
      )}

      {isModalOpen && (
        <dialog open style={{ padding: "0", borderRadius: "10px" }}>
          <div id="modal-box" style={{ padding: "1rem" }}>
            <form className="logForm" onSubmit={handleFormSubmit}>
              <button
                type="button"
                id="close-modal-btn"
                className="btn-close"
                aria-label="Закрыть"
                style={{
                  float: "right",
                  border: "0px",
                  backgroundColor: "white",
                }}
                onClick={closeModal}
              >X</button>
              <h6 className="logErrMsg" />

              <div className="mb-30">
                
                <input
                  name="login"
                  placeholder="введите login"
                  type="text"
                  className="form-control"
                  id="exampleInputLogin1"
                  aria-describedby="loginHelp"
                />
              </div>
              <div className="mb-30">
                <input
                  name="password"
                  placeholder="введите Password"
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
                <div id="passwordHelp" className="form-text">
                  Не забывай пароль!
                </div>
              </div>
              <button type="submit" className="btn btn-outline-light">
                Отправить
              </button>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
}
