const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../db/models');

loginRouter.get('/', (req, res) => {
  const { login } = req.session;
  console.log(login);
  res.json(login);
});

loginRouter.post('/', async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ where: { login } });
    if (!user) {
      console.log('user not found');
      res.json({
        logErr: `Пользователь ${login} не найден, вам необходимо зарегистрироваться`,
      });
    } else {
      const checkPass = await bcrypt.compare(password, user.password);
      if (checkPass) {
        req.session.userId = user.id;
        req.session.login = user.login;
        req.session.isAdmin = user.isAdmin;
        req.session.save(() => {
          console.log('Password correct. Session saved');
          res.json({ logDone: `Welcome ${user.login}`, login: user.login, isAdmin: user.isAdmin });
        });
      } else {
        console.log('Wrong password');
        res.json({ passErr: 'Неверный пароль, попробуйте ещё раз!' });
      }
    }
  } catch (error) {
    console.log('loginRouter.post =>', error);
  }
});

module.exports = loginRouter;
