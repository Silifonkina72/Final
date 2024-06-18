require('dotenv').config();
require('@babel/register');
const express = require('express');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const app = express();
// const apiRouter = require('./routers/api.router.js');
// const loginRouter = require('./routers/login.router');
// const indexRouter = require('./routers/index');
// const regRouter = require('./routers/reg.router');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { PORT } = process.env;
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE'],
};
app.use(cors(corsOptions));
const sessionConfig = {
  name: 'cookieName', // не забудь указать то же имя и при удалении куки
  store: new FileStore(),
  secret: process.env.SESSION_SECRET ?? 'Mellon', // SESSION_SECRET в .env
  resave: false, // если true, пересохранит сессию, даже если она не менялась
  saveUninitialized: false, // если false, куки появятся только при установке req.session
  cookie: {
    maxAge: 24 * 1000 * 60 * 60, // время жизни в ms, 24(h)*1000(ms)*60(sec)*60(min) = 86400000
    httpOnly: true, // секьюрность, оставляем true
  },
};
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));
app.use(express.static(path.join(process.cwd(), 'public/')));
app.use(cors());
app.use(session(sessionConfig));
// app.use('/api/v1', apiRouter);
// app.use('/login', loginRouter);
// app.use('/register', regRouter);//Создание Юзера с одной игрой
// // app.use('/client', clientRouter);
// app.use('/api', apiRouter);//Игра
// // app.use('/entries', entriesRouter);
// app.use('/', indexRouter);
app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`); 
});















