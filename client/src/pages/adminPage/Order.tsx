import React, { useEffect, useState } from "react";
import styles from "./order.module.css";
import { useAppDispatch } from "../../hooks";
import { orderThunk } from "../../store/thunkActions/orderThunk";

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

  // const updateOrderStatus = async (id, status) => {
  //   try {
  //     const updatedOrder = orders.find((order) => order.id === id);
  //     if (status === "isSent") {
  //       updatedOrder.isForm = false;
  //       updatedOrder.isSent = true;
  //     } else if (status === "isAccept") {
  //       updatedOrder.isSent = false;
  //       updatedOrder.isAccept = true;
  //     }
  //     await fetch(`http://localhost:3000/orders/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedOrder),
  //     });
  //     console.log(updatedOrder);
  //     fetchOrders();
  //   } catch (error) {
  //     console.error("Ошибка при обновлении статуса заказа:", error);
  //   }
  // };

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

  // console.log("ORDERS ", orders[0]?.Laks[0]);

  return (
    <div className={styles.container}>
      <h2>Заказы тут:</h2>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3>Заказы, ожидающие оформления</h3>
          {orders
            .filter((order) => !order.isSent && !order.isAccept)
            .map((order) => (
              <div key={order.id} className={styles.order}>
                <p>Пользователь: {order.User.login}</p>
                <p>Адрес: {order.address}</p>
                <p>Общая цена: {order.allPrice ?? "Не указано"}</p>
                <p>Статус: оформлен</p>
                <p>Компоненты:</p>
                <ol>
                  {order?.Laks[0]?.name && (
                    <li>
                      <img
                        src={order.Laks[0].img}
                        alt={order.Laks[0].name}
                        width={50}
                        height={50}
                        style={{ minHeight: "50px" }}
                      />
                      {order.Laks[0].name}
                    </li>
                  )}
                  {order?.AcrylicPrimers[0]?.name && (
                    <li>
                      <img
                        src={order.AcrylicPrimers[0].img}
                        alt={order.AcrylicPrimers[0].name}
                        width={50}
                        height={50}
                        style={{ minHeight: "50px" }}
                      />
                      {order.AcrylicPrimers[0].name}
                    </li>
                  )}
                  {order?.Grounds[0]?.name && (
                    <li>
                      <img
                        src={order.Grounds[0].img}
                        alt={order.Grounds[0].name}
                        width={50}
                        height={50}
                        style={{ minHeight: "50px" }}
                      />
                      {order.Grounds[0].name}
                    </li>
                  )}
                  {order?.Paints[0]?.name && (
                    <li>
                      <img
                        src={order.Paints[0].img}
                        alt={order.Paints[0].name}
                        width={50}
                        height={50}
                        style={{ minHeight: "50px" }}
                      />
                      {order.Paints[0].name}
                    </li>
                  )}
                  {order?.Patinas[0]?.name && (
                    <li>
                      <img
                        src={order.Patinas[0].img}
                        alt={order.Patinas[0].name}
                        width={50}
                        height={50}
                        style={{ minHeight: "50px" }}
                      />
                      {order.Patinas[0].name}
                    </li>
                  )}
                  {order?.PrimerInsulators[0]?.name && (
                    <li>
                      <img
                        src={order.PrimerInsulators[0].img}
                        alt={order.PrimerInsulators[0].name}
                        width={50}
                        height={50}
                        style={{ minHeight: "50px" }}
                      />
                      {order.PrimerInsulators[0].name}
                    </li>
                  )}
                  {order?.Stains[0]?.name && (
                    <li>
                      <img
                        src={order.Stains[0].img}
                        alt={order.Stains[0].name}
                        width={50}
                        height={50}
                        style={{ minHeight: "50px" }}
                      />
                      {order.Stains[0].name}
                    </li>
                  )}
                </ol>

                <button onClick={() => formHandler(order.id)}>Отправить</button>
              </div>
            ))}
        </div>
        <div className={styles.column}>
          <h3>Отправленные заказы</h3>
          {orders
            .filter((order) => order.isSent && !order.isAccept)
            .map((order) => (
              <div key={order.id} className={styles.order}>
                <p>Пользователь: {order.User.login}</p>
                <p>Адрес: {order.address}</p>
                <p>Общая цена: {order.allPrice ?? "Не указано"}</p>
                <p>Статус: отправлен</p>
                <button onClick={() => formHandler(order.id)}>Завершить</button>
              </div>
            ))}
        </div>
        <div className={styles.column}>
          <h3>Завершенные заказы</h3>
          {orders
            .filter((order) => order.isAccept)
            .map((order) => (
              <div key={order.id} className={styles.order}>
                <p>Пользователь: {order.User.login}</p>
                <p>Адрес: {order.address}</p>
                <p>Общая цена: {order.allPrice ?? "Не указано"}</p>
                <p>Статус: завершен</p>
                <button onClick={() => deleteOrder(order.id)}>Удалить</button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
