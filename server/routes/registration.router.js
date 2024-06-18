const regRouter = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../db/models');

regRouter.get('/', (req, res) => {
  const { login } = req.session;
  res.json(login);
});

regRouter.post('/', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (user) {
      res.json({ regErr: `Пользователь ${login} уже существует` });
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({ login, password: hash });
      req.session.login = newUser.login;
      req.session.save(() => {
        res.json({ regDone: `Registration succes ${login}` });
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = regRouter;
