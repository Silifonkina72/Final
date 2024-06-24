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
  const { allPrice, address, itemsSquare, itemsVolume } = req.body;
  // console.log('aaaaaaall', itemsVolume);
  const user_id = req.session.userId;
  //   console.log(' uuuuuuser', req.session);

  try {
    const newOrder = await Order.create({
      allPrice,
      user_id: 1,
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
  //   console.log('iiiiiiid', id);
  const order_id = id;
  const { itemsSquare, itemsVolume } = order;
  //   console.log('aaaaaaall', itemsSquare, itemsVolume);

  for (const product of itemsVolume) {
    const { model, id: productId, count } = product;

    switch (model) {
      case 'Lak':
        try {
          const newOrder = await OrdersLak.create({
            lak_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'AcrylicPrimer':
        try {
          const newOrder = await OrdersAcrylicPrimer.create({
            acrylicPrimer_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'Ground':
        try {
          const newOrder = await OrdersGround.create({
            ground_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'Paint':
        try {
          const newOrder = await OrdersPaint.create({
            paint_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'Patina':
        try {
          const newOrder = await OrdersPatina.create({
            patina_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'PrimerInsulator':
        try {
          const newOrder = await OrdersPrimerInsulator.create({
            primerInsulator_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'Stain':
        try {
          const newOrder = await OrdersStain.create({
            stain_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;
    }
  }


  for (const product of itemsSquare) {
    const { model, id: productId, count } = product;

    switch (model) {
      case 'Lak':
        try {
          const newOrder = await OrdersLak.create({
            lak_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'AcrylicPrimer':
        try {
          const newOrder = await OrdersAcrylicPrimer.create({
            acrylicPrimer_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'Ground':
        try {
          const newOrder = await OrdersGround.create({
            ground_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'Paint':
        try {
          const newOrder = await OrdersPaint.create({
            paint_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'Patina':
        try {
          const newOrder = await OrdersPatina.create({
            patina_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'PrimerInsulator':
        try {
          const newOrder = await OrdersPrimerInsulator.create({
            primerInsulator_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;

      case 'Stain':
        try {
          const newOrder = await OrdersStain.create({
            stain_id: productId,
            order_id,
            quantity: count,
          });
          res.status(201).json(newOrder);
        } catch (error) {
          console.error('Error creating order:', error);
          res.status(500).json({ error: 'Error creating order' });
        }
        break;
    }
  }
});

module.exports = orderRouter;
