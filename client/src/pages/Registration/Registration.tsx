import React, { ChangeEvent, useState, FormEvent } from "react";
import { fetchReg } from "../../redux/thunkActions";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import styles from "./Registration.module.css";

export default function Registration() {
  const [input, setInput] = useState({ login: "", password: "" });
  const [errMsg, setErrMsg] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(fetchReg(input));

      if (fetchReg.fulfilled.match(resultAction)) {
        if (resultAction.payload.regErr) {
          setErrMsg(resultAction.payload.regErr);
        }
        if (resultAction.payload.regDone) {
          localStorage.setItem("login", resultAction.payload.login || "");
          setInput({ login: "", password: "" });
          navigate("/");
        }
      } else {
        console.log(resultAction.payload);
        setErrMsg(
          "Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз."
        );
      }
    } catch (error) {
      console.log(error);
      setErrMsg(
        "Произошла ошибка при отправке данных. Пожалуйста, попробуйте еще раз."
      );
    }
  };

  return (
    <>
      <form onSubmit={submitHandler} className={styles.regForm}>
        {!!errMsg.length && <h4 className="errMsg">{errMsg}</h4>}
        <div className="mb-3">
          <label htmlFor="exampleInputLogin" className="form-label">
            Придумайте логин
          </label>
          <input
            required
            onChange={changeHandler}
            value={input.login}
            name="login"
            type="text"
            style={{ width: "300px" }}
            className="form-control"
            id="exampleInputLogin1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Придумайте пароль
          </label>
          <input
            required
            onChange={changeHandler}
            value={input.password}
            name="password"
            type="password"
            style={{ width: "300px" }}
            className="form-control"
            id="exampleInputPassword1"
          />
          {/* <div id="passwordHelp" className="form-text">Мы никому не передадим ваш пароль и сами не увидим</div> */}
        </div>
        <br />
        <button type="submit" className="btn btn-outline-dark">
          Отправить
        </button>
      </form>
    </>
  );
}
