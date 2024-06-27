const express = require("express");
const nodemailer = require("nodemailer");
const ordersRouter = express.Router();
const {
  Order,
  AcrylicPrimer,
  Ground,
  Lak,
  Paint,
  Patina,
  PrimerInsulator,
  Stain,
} = require("../db/models"); // Подключаем модель Order
const { where, Op } = require("sequelize");
const { User } = require("../db/models");

ordersRouter.get("/", async (req, res) => {
  try {
    
    const orders = await Order.findAll({
      where: {
        isForm: true,
      },
      include: [
        {
          model: User,
          attributes: ["login"],
        },
        {
          model: Lak,
          attributes: ["name", 'img'],
          through: {
            attributes: [],
          },
        },
        {
          model: AcrylicPrimer,
          attributes: ["name", 'img'],
          through: {
            attributes: [],
          },
        },
        {
          model: Ground,
          attributes: ["name", 'img'],
          through: {
            attributes: [],
          },
        },
        {
          model: Paint,
          attributes: ["name", 'img'],
          through: {
            attributes: [],
          },
        },
        {
          model: Patina,
          attributes: ["name", 'img'],
          through: {
            attributes: [],
          },
        },
        {
          model: PrimerInsulator,
          attributes: ["name", 'img'],
          through: {
            attributes: [],
          },
        },
        {
          model: Stain,
          attributes: ["name", 'img'],
          through: {
            attributes: [],
          },
        },
      ],
    });

    const orders2 = orders.map((order) =>
      order.get({ plain: true, nested: true })
    );
    // console.log(686889, orders2);
    // console.log("ple", orders2[0].Laks[0].name);
    // console.log("ple2", orders2);
    res.json(orders2);
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



ordersRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
 
  try {
    const order = await Order.findByPk(id);
    console.log('+-+-+', order.user_id);
    const user = await User.findByPk(order.user_id);
    if (!order) {
      return res.status(404).json({ error: "Заказ не найден" });
    }

    if (order.isSent === false&& order.isAccept === false) {
      order.isSent = true;
      await transporter.sendMail({
        from: "chectb@mail.ru",
        to: user.email,
        subject: `Заказ отправлен к ${user.login}`,
        text: `Дорогой покупатель`,
        html: `
          <p><strong>Дорогой покупатель, ${user.login}. Ваш заказ оформлен, спасибо, что выбрали наш сервис!</strong> </p>
        `,
      });



    } else  {
      order.isAccept = true;
    }
// console.log('ORDER', order);
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
