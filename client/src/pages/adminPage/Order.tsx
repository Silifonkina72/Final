

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
      await fetch(`http://localhost:3000/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
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
      <div>
        {orders.map((order) => (
          <div key={order.id} className={styles.order}>
            <p>Пользователь ID: {order.user_id}</p>
            <p>Адрес: {order.address}</p>
            <p>Общая цена: {order.allPrice ?? 'Не указано'}</p>
            <p>Скидка: {order.discount ?? 'Не указано'}</p>
            <p>Форма: {order.isForm ? 'Да' : 'Нет'}</p>
            <p>Отправлено: {order.isSent ? 'Да' : 'Нет'}</p>
            <p>Принято: {order.isAccept ? 'Да' : 'Нет'}</p>
            {order.isForm && (
              <button onClick={() => updateOrderStatus(order.id, 'isSent')}>Отправить</button>
            )}
            {order.isSent && (
              <button onClick={() => updateOrderStatus(order.id, 'isAccept')}>Завершить</button>
            )}
            {order.isAccept && (
              <button onClick={() => deleteOrder(order.id)}>Удалить</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

