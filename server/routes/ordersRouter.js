const express = require('express');
const ordersRouter = express.Router();
const { Order } = require('../db/models'); // Подключаем модель Order

ordersRouter.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Произошла ошибка при получении заказов' });
  }
});

ordersRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    if (status === 'isSent') {
      order.isForm = false;
      order.isSent = true;
      order.isAccept = false;
    } else if (status === 'isAccept') {
      order.isForm = false;
      order.isSent = false;
      order.isAccept = true;
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Произошла ошибка при обновлении статуса заказа' });
  }
});

ordersRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Заказ не найден' });
    }

    await order.destroy();
    res.json({ message: 'Заказ удалён' });
  } catch (error) {
    res.status(500).json({ error: 'Произошла ошибка при удалении заказа' });
  }
});

module.exports = ordersRouter;
