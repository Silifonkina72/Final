import React, { useEffect, useState } from "react";
import styles from "./order.module.css";
import { useAppDispatch } from "../../hooks";
import { orderThunk } from "../../store/thunkActions/orderThunk";
import { Button } from "@chakra-ui/react";

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

  console.log(orders);

  return (
    <div className={styles.container}>
      <h2>Здесь мы можем отслеживать статус заказов:</h2>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3>Заказы ожидающие оформления</h3>
          {orders
            .filter((order) => !order.isSent && !order.isAccept)
            .map((order) => (
              <div key={order.id} className={styles.order}>

               

                <p> <span  style={{ fontWeight: "bold" }}>Пользователь :</span> {order.User.login}</p>
                <p><span  style={{ fontWeight: "bold" }}>Адрес:</span> {order.address}</p>
                <p><span  style={{ fontWeight: "bold" }}>Общая цена:</span> {order.allPrice ?? "Не указано"}</p>
                <p><span  style={{ fontWeight: "bold" }}>Статус:</span> оформлен</p>
                <p> <span  style={{ fontWeight: "bold" }}>Компоненты:</span></p>
                <div>
                  {order?.Laks[0]?.name && (
                    <div
                     style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }} 
                    className="containerImg">
                      <img
                      className="imgOrder"
                        src={order.Laks[0].img}
                        alt={order.Laks[0].name}
                        width={40}
                        height={40}
                        style={{ minHeight: "40px", marginBottom: '10px', border: '1px solid black',  }}
                      />
                      <span className="nameOrder">{order.Laks[0].name}</span> 
                    </div>
                  )}
                  {order?.AcrylicPrimers[0]?.name && (
                    <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }} >
                      <img
                      
                        src={order.AcrylicPrimers[0].img}
                        alt={order.AcrylicPrimers[0].name}
                        width={40}
                        height={40}
                        style={{ minHeight: "40px", marginBottom: '10px', border: '1px solid black',  }}
                      />
                      {order.AcrylicPrimers[0].name}
                    </div>
                  )}
                  {order?.Grounds[0]?.name && (
                    <div  style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }} >
                      <img
                        src={order.Grounds[0].img}
                        alt={order.Grounds[0].name}
                        width={40}
                        height={40}
                        style={{ minHeight: "40px", marginBottom: '10px', border: '1px solid black',  }}
                      />
                      {order.Grounds[0].name}
                    </div>
                  )}
                  {order?.Paints[0]?.name && (
                    <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }} >
                      <img
                        src={order.Paints[0].img}
                        alt={order.Paints[0].name}
                        width={40}
                        height={40}
                        style={{ minHeight: "40px", marginBottom: '10px', border: '1px solid black',  }}
                      />
                      {order.Paints[0].name}
                    </div>
                  )}
                  {order?.Patinas[0]?.name && (
                    <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }} >
                      <img
                        src={order.Patinas[0].img}
                        alt={order.Patinas[0].name}
                        width={40}
                        height={40}
                        style={{ minHeight: "40px", marginBottom: '10px', border: '1px solid black',  }}
                      />
                      {order.Patinas[0].name}
                    </div>
                  )}
                  {order?.PrimerInsulators[0]?.name && (
                    <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }} >
                      <img
                        src={order.PrimerInsulators[0].img}
                        alt={order.PrimerInsulators[0].name}
                        width={40}
                        height={40}
                        style={{ minHeight: "40px", marginBottom: '10px', border: '1px solid black',  }}
                      />
                      {order.PrimerInsulators[0].name}
                    </div>
                  )}
                  {order?.Stains[0]?.name && (
                    <div
                    style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '10px' }} >
                      <img
                        src={order.Stains[0].img}
                        alt={order.Stains[0].name}
                        width={40}
                        height={40}
                        style={{ minHeight: "40px", marginBottom: '10px', border: '1px solid black',  }}
                      />
                      {order.Stains[0].name}
                    </div>
                  )}
                </div>

                <Button
              size="xs"
              bg="purple.700" // Красивый зеленый цвет
              color="white" // Белый цвет текста
              _hover={{ bg: 'purple.800' }} // Темнее при наведении
              _active={{ bg: 'purple.900' }} // Темнее при нажатии
                onClick={() => formHandler(order.id)}>Отправить</Button>
              </div>
            ))}
        </div>


{/* <div> */}
        <div className={styles.column}>
          <h3>Отправленные заказы</h3>
          {orders
            .filter((order) => order.isForm && order.isSent && !order.isAccept)
            .map((order) => (
              <div key={order.id} className={styles.order}>
                <p>Пользователь : {order.User.login}</p>
                <p>Адрес: {order.address}</p>
                <p>Общая цена: {order.allPrice ?? "Не указано"}</p>
                <p>Статус: отправлен</p>
                <Button
                size="xs"
                bg="purple.700" // Красивый зеленый цвет
                color="white" // Белый цвет текста
                _hover={{ bg: 'purple.800' }} // Темнее при наведении
                _active={{ bg: 'purple.900' }} // Темнее при нажатии
                onClick={() => formHandler(order.id)}>Завершить</Button>
              </div>
            ))}
        </div>
        <div className={styles.column}>
          <h3>Завеншенные заказы</h3>
          {orders
            .filter((order) => order.isAccept)
            .map((order) => (
              <div key={order.id} className={styles.order}>
                <p>Пользователь : {order.User.login}</p>
                <p>Адрес: {order.address}</p>
                <p>Общая цена: {order.allPrice ?? "Не указано"}</p>
                <p>Статус: завершен</p>
                <Button 
                size="xs"
                bg="purple.700" // Красивый зеленый цвет
                color="white" // Белый цвет текста
                _hover={{ bg: 'purple.800' }} // Темнее при наведении
                _active={{ bg: 'purple.900' }} // Темнее при нажатии
                onClick={() => deleteOrder(order.id)}>Удалить</Button>
              </div>
            ))}
        </div>
        {/* </div> */}


      </div>
    </div>
  );
}
