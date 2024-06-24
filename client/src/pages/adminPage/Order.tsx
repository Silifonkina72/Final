import React, { useEffect, useState } from 'react';
import styles from './order.module.css';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/orders');
      const data = await response.json();
      
      setOrders(data);
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      
      const updatedOrder = orders.find(order => order.id === id);
      if (status === 'isSent') {
        updatedOrder.isForm = false;
        updatedOrder.isSent = true;
      } else if (status === 'isAccept') {
        updatedOrder.isSent = false;
        updatedOrder.isAccept = true;
      }
      await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        
        
        body: JSON.stringify(updatedOrder),
      });
      console.log(updatedOrder);
      fetchOrders();
    } catch (error) {
      console.error('Ошибка при обновлении статуса заказа:', error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'DELETE',
      });
      fetchOrders();
    } catch (error) {
      console.error('Ошибка при удалении заказа:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Заказы тут:</h2>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3>Выходящий заказ</h3>
          {orders.filter(order => !order.isSent && !order.isAccept).map((order) => (
            <div key={order.id} className={styles.order}>
              <p>Пользователь ID: {order.user_id}</p>
              <p>Адрес: {order.address}</p>
              <p>Общая цена: {order.allPrice ?? 'Не указано'}</p>
              <p>Форма: {order.isForm ? 'Да' : 'Нет'}</p>
              <button onClick={() => updateOrderStatus(order.id, 'isSent')}>Отправить</button>
            </div>
          ))}
        </div>
        <div className={styles.column}>
          <h3>Отправлено</h3>
          {orders.filter(order => order.isSent && !order.isAccept).map((order) => (
            <div key={order.id} className={styles.order}>
              <p>Пользователь ID: {order.user_id}</p>
              <p>Адрес: {order.address}</p>
              <p>Общая цена: {order.allPrice ?? 'Не указано'}</p>
              <p>Форма: {order.isForm ? 'Да' : 'Нет'}</p>
              <button onClick={() => updateOrderStatus(order.id, 'isAccept')}>Завершить</button>
            </div>
          ))}
        </div>
        <div className={styles.column}>
          <h3>Принято</h3>
          {orders.filter(order => order.isAccept).map((order) => (
            <div key={order.id} className={styles.order}>
              <p>Пользователь ID: {order.user_id}</p>
              <p>Адрес: {order.address}</p>
              <p>Общая цена: {order.allPrice ?? 'Не указано'}</p>
              <p>Форма: {order.isForm ? 'Да' : 'Нет'}</p>
              <button onClick={() => deleteOrder(order.id)}>Удалить</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


