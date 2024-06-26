/* eslint-disable quotes */
const express = require("express");
const ordersRouter = express.Router();
const { Order, User } = require("../db/models"); // Подключаем модель Order
const { where, Op } = require("sequelize");
const nodemailer = require("nodemailer");

ordersRouter.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        isForm: {
          [Op.ne]: null,
        },
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Произошла ошибка при получении заказов" });
  }
});

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: "chectb@mail.ru",
    pass: "x2V9PHZRGh0hx5zfcsEe",
  },
});

// ordersRouter.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { status, userEmail, userName, userId } = req.body;

//   try {
//     const order = await orders.findByPk(id);
//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     if (status === 'isSent') {
//       order.isForm = false;
//       order.isSent = true;
//     } else if (status === 'isAccept') {
//       order.isSent = false;
//       order.isAccept = true;

//       // Отправка письма при завершении заказа
//   await transporter.sendMail({
//     from: 'chectb@mail.ru',
//     to: userEmail,
//     subject: `Заказ от пользователя ${userName}`,
//     text: `Имя: ${userName}\nID пользователя: ${userId}`,
//     html: `
//       <p><strong>Имя:</strong> ${userName}</p>
//       <p><strong>ID пользователя:</strong> ${userId}</p>
//     `,
//   });
// }

//     await order.save();
//     res.json(order);
//   } catch (error) {
//     console.error('Error updating order:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

ordersRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { isForm, isAccept, isSent, user_id } = req.body;
  try {
    const order = await Order.findByPk(id);
    const user = await User.findByPk(user_id);
    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    if (isSent) {
      await transporter.sendMail({
        from: "chectb@mail.ru",
        to: user.email,
        subject: `Заказ отправлен к ${user.login}`,
        text: `Дорогой покупатель`,
        html: `
          <p><strong>дорогой покупатель <<<< ${user.login}>>>>. Спасибо за сотрудничество!</strong> </p>
        `,
      });
      order.isForm = false;
      order.isSent = true;
      order.isAccept = false;
    } else if (isAccept) {
      order.isForm = false;
      order.isSent = false;
      order.isAccept = true;
    }

    await order.save();
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Произошла ошибка при обновлении статуса заказа" });
  }
});

ordersRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    order.isForm = null;
    order.isSent = null;
    order.isAccept = null;

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Произошла ошибка при удалении заказа" });
  }
});

module.exports = ordersRouter;
