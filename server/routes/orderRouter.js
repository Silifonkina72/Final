const { Router } = require('express');
const orderRouter = new Router();

const {
  AcrylicPrimer,
  Ground,
  Lak,
  Paint,
  Patina,
  PrimerInsulator,
  Stain,
  Order,
  OrdersAcrylicPrimer,
  OrdersGround,
  OrdersLak,
  OrdersPaint,
  OrdersPatina,
  OrdersPrimerInsulator,
  OrdersStain,
} = require('../db/models');

orderRouter.post('/', async (req, res) => {
  const { user, allPrice, address } = req.body;
  console.log(user);
  const user_id = user.userId;
  try {
    const newOrder = await Order.create({
      allPrice,
      user_id,
      isForm: false,
      isSent: false,
      isAccept: true,
      address,
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' });
  }
});

orderRouter.post('/product', async (req, res) => {
  const { order, id } = req.body;
  const order_id = id;
  const { itemsSquare, itemsVolume } = order;

  try {
    const volumePromises = itemsVolume.map((product) => {
      const { model, id: productId, count } = product;

      switch (model) {
        case 'Lak':
          return OrdersLak.create({
            lak_id: productId,
            order_id,
            quantity: count,
          });
        case 'AcrylicPrimer':
          return OrdersAcrylicPrimer.create({
            acrylicPrimer_id: productId,
            order_id,
            quantity: count,
          });
        case 'Ground':
          return OrdersGround.create({
            ground_id: productId,
            order_id,
            quantity: count,
          });
        case 'Paint':
          return OrdersPaint.create({
            paint_id: productId,
            order_id,
            quantity: count,
          });
        case 'Patina':
          return OrdersPatina.create({
            patina_id: productId,
            order_id,
            quantity: count,
          });
        case 'PrimerInsulator':
          return OrdersPrimerInsulator.create({
            primerInsulator_id: productId,
            order_id,
            quantity: count,
          });
        case 'Stain':
          return OrdersStain.create({
            stain_id: productId,
            order_id,
            quantity: count,
          });
        default:
          return null;
      }
    });

    const squarePromises = itemsSquare.map((product) => {
      const { model, id: productId, square } = product;
      const count = Math.ceil(square / 4);
      switch (model) {
        case 'Lak':
          return OrdersLak.create({
            lak_id: productId,
            order_id,
            quantity: count,
          });
        case 'AcrylicPrimer':
          return OrdersAcrylicPrimer.create({
            acrylicPrimer_id: productId,
            order_id,
            quantity: count,
          });
        case 'Ground':
          return OrdersGround.create({
            ground_id: productId,
            order_id,
            quantity: count,
          });
        case 'Paint':
          return OrdersPaint.create({
            paint_id: productId,
            order_id,
            quantity: count,
          });
        case 'Patina':
          return OrdersPatina.create({
            patina_id: productId,
            order_id,
            quantity: count,
          });
        case 'PrimerInsulator':
          return OrdersPrimerInsulator.create({
            primerInsulator_id: productId,
            order_id,
            quantity: count,
          });
        case 'Stain':
          return OrdersStain.create({
            stain_id: productId,
            order_id,
            quantity: count,
          });
        default:
          return null; 
      }
    });

    // Ожидаем выполнения всех промисов
    await Promise.all(volumePromises);
    await Promise.all(squarePromises);

    res.status(201).json({ message: 'Orders created successfully' });
  } catch (error) {
    console.error('Error creating orders:', error);
    res.status(500).json({ error: 'Error creating orders' });
  }
});

module.exports = orderRouter;
