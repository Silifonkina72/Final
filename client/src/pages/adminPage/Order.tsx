import React, { useEffect, useState } from "react";
import styles from "./order.module.css";
import { useAppDispatch } from "../../hooks";
import { orderThunk } from "../../store/thunkActions/orderThunk";
import { Button, Box, useMediaQuery } from "@chakra-ui/react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const dispatch = useAppDispatch();

  const formHandler = async (id) => {
    console.log("id", id);
    await dispatch(orderThunk(id));
    await fetchOrders();
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/orders");
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Ошибка при загрузке заказов:", error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await fetch(`http://localhost:3000/orders/${id}`, {
        method: "DELETE",
      });
      fetchOrders();
    } catch (error) {
      console.error("Ошибка при удалении заказа:", error);
    }
  };

  console.log("?!?!", orders);
  const [isLargerThan700] = useMediaQuery("(min-width: 700px)");

  return (
    <div className={styles.container}>
      <div className={styles.columns}>
        <div className={styles.column} style={{ minHeight: "unset" }}>
          <Box
            style={{
              fontWeight: "bold",
              marginBottom: isLargerThan700 ? "30px" : "5px",
            }}
            className="orderText"
          >
            Заказы, ожидающие отправки
          </Box>
          {orders
            .filter((order) => !order.isSent && !order.isAccept)
            .map((order) => (
              <div key={order.id} className={styles.order}>
                <p>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>
                    Пользователь:
                  </span>{" "}
                  {order.User.login}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Адрес:</span>{" "}
                  {order.address}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Общая цена:</span>{" "}
                  {order.allPrice ?? "Не указано"}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Статус:</span> оформлен
                </p>
                <p>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Компоненты:</span>
                </p>
                <div>
                  {order?.Laks[0]?.name && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                      className="containerImg"
                    >
                      <img
                        className="imgOrder"
                        src={order.Laks[0].img}
                        alt={order.Laks[0].name}
                        width={40}
                        height={40}
                        style={{
                          minHeight: "40px",
                          marginBottom: "10px",
                          border: "1px solid black",
                        }}
                      />
                      <span className="nameOrder">
                        {order.Laks[0].name}, количество:{" "}
                        {order.Laks[0]?.OrdersLak?.quantity}л.
                      </span>
                    </div>
                  )}
                  {order?.AcrylicPrimers[0]?.name && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={order.AcrylicPrimers[0].img}
                        alt={order.AcrylicPrimers[0].name}
                        width={40}
                        height={40}
                        style={{
                          minHeight: "40px",
                          marginBottom: "10px",
                          border: "1px solid black",
                        }}
                      />
                      <span>
                        {order.AcrylicPrimers[0].name}, количество:{" "}
                        {order.AcrylicPrimers[0]?.OrdersAcrylicPrimer?.quantity}
                        л.
                      </span>
                    </div>
                  )}
                  {order?.Grounds[0]?.name && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={order.Grounds[0].img}
                        alt={order.Grounds[0].name}
                        width={40}
                        height={40}
                        style={{
                          minHeight: "40px",
                          marginBottom: "10px",
                          border: "1px solid black",
                        }}
                      />
                      <span>
                        {order.Grounds[0].name}, количество:{" "}
                        {order.Grounds[0]?.OrdersGround?.quantity}л.
                      </span>

                      <br />
                    </div>
                  )}
                  {order?.Paints[0]?.name && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={order.Paints[0].img}
                        alt={order.Paints[0].name}
                        width={40}
                        height={40}
                        style={{
                          minHeight: "40px",
                          marginBottom: "10px",
                          border: "1px solid black",
                        }}
                      />
                      <span>
                        {order.Paints[0].name}, количество:{" "}
                        {order.Paints[0]?.OrdersPaint?.quantity}л.
                      </span>
                    </div>
                  )}
                  {order?.Patinas[0]?.name && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={order.Patinas[0].img}
                        alt={order.Patinas[0].name}
                        width={40}
                        height={40}
                        style={{
                          minHeight: "40px",
                          marginBottom: "10px",
                          border: "1px solid black",
                        }}
                      />
                      <span>
                        {order.Patinas[0].name}, количество:{" "}
                        {order.Patinas[0]?.OrdersPatina?.quantity}л.
                      </span>
                    </div>
                  )}
                  {order?.PrimerInsulators[0]?.name && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={order.PrimerInsulators[0].img}
                        alt={order.PrimerInsulators[0].name}
                        width={40}
                        height={40}
                        style={{
                          minHeight: "40px",
                          marginBottom: "10px",
                          border: "1px solid black",
                        }}
                      />
                      <span>
                        {order.PrimerInsulators[0].name}, количество:{" "}
                        {
                          order.PrimerInsulators[0]?.OrdersPrimerInsulator
                            ?.quantity
                        }
                        л.
                      </span>
                    </div>
                  )}
                  {order?.Stains[0]?.name && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <img
                        src={order.Stains[0].img}
                        alt={order.Stains[0].name}
                        width={40}
                        height={40}
                        style={{
                          minHeight: "40px",
                          marginBottom: "10px",
                          border: "1px solid black",
                        }}
                      />
                      <span>
                        {order.Stains[0].name}, количество:{" "}
                        {order.Stains[0]?.OrdersStain?.quantity}л.
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  size="xs"
                  bg="teal"
                  color="white"
                  _hover={{ bg: "teal.800" }}
                  _active={{ bg: "teal.900" }}
                  onClick={() => formHandler(order.id)}
                >
                  Отправить
                </Button>
              </div>
            ))}
        </div>

        <div className={styles.column} style={{ minHeight: "unset" }}>
          <Box
            style={{
              fontWeight: "bold",
              marginBottom: isLargerThan700 ? "30px" : "5px",
            }}
            className="orderText"
          >
            Отправленные заказы
          </Box>
          {orders
            .filter((order) => order.isForm && order.isSent && !order.isAccept)
            .map((order) => (
              <div key={order.id} className={styles.order}>
                <p>
                  <span style={{ fontWeight: "bold" }}>Пользователь:</span>{" "}
                  {order.User.login}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Адрес:</span>{" "}
                  {order.address}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Общая цена:</span>{" "}
                  {order.allPrice ?? "Не указано"}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Статус:</span> отправлен
                </p>
                <Button
                  size="xs"
                  bg="teal"
                  color="white"
                  _hover={{ bg: "teal.800" }}
                  _active={{ bg: "teal.900" }}
                  onClick={() => formHandler(order.id)}
                >
                  Доставлен
                </Button>
              </div>
            ))}
        </div>
        <div className={styles.column} style={{ minHeight: "unset" }}>
          <Box
            style={{
              fontWeight: "bold",
              marginBottom: isLargerThan700 ? "30px" : "5px",
            }}
            className="orderText"
          >
            Завершенные заказы
          </Box>
          {orders
            .filter((order) => order.isAccept)
            .map((order) => (
              <div key={order.id} className={styles.order}>
                <p>
                  <span style={{ fontWeight: "bold" }}>Пользователь:</span>{" "}
                  {order.User.login}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Адрес:</span>{" "}
                  {order.address}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Общая цена:</span>{" "}
                  {order.allPrice ?? "Не указано"}
                </p>
                <p>
                  <span style={{ fontWeight: "bold" }}>Статус:</span> доставлен
                </p>
                <Button
                  size="xs"
                  bg="teal"
                  color="white"
                  _hover={{ bg: "teal.800" }}
                  _active={{ bg: "teal.900" }}
                  onClick={() => deleteOrder(order.id)}
                >
                  Удалить
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
