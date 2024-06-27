// ! Настраиваем окружение для работы

// Инициализация проекта
// * инициализируем проект(npm init -y)
// * создаем гитигнор (npx create-gitignore node)
// * ставим eslint (npm init @eslint/config)
//! * устанавливаем необходимые библиотеки (npm i sequelize sequelize-cli pg pg-hstore)
// * создаём файл .sequelizerc, копируем в него следующее:
/*
    const path = require('path');
    module.exports = {
        'config': path.resolve('db', 'config', 'database.json'),
        'models-path': path.resolve('db', 'models'),
        'seeders-path': path.resolve('db', 'seeders'),
        'migrations-path': path.resolve('db', 'migrations'),
    };
*/
// * проинициализируем (npx sequelize init) //этой командой мы создаем папку db
// * правим конфиг (development only)

// "development": {
// 	"username": "max_kosh_tiger",
// 	"password": "123",
// 	"database": "p1w3d2tigers_orm",
// 	"host": "127.0.0.1",
// 	"dialect": "postgres"
//  },

// * создаем базу данных (npx sequelize db:create) //создается БД которую мы указали в конфиге, можем проверить в бобре

// ! Создаём и рассматриваем модели и миграции (модель в единственном числе)


//? ONE TO MENY
// * npx sequelize-cli model:generate --name Student --attributes first_name:string,last_name:string,age:integer
// * npx sequelize-cli model:generate --name Computer --attributes model:string,owner_id:integer
//?  npx sequelize-cli model:generate --name User --attributes login:string,password:string
//? npx sequelize-cli model:generate --name Food --attributes url:string,user_id:integer
//? npx sequelize-cli model:generate --name PrimerInsulator --attributes priceArea:integer,priceVolume:integer,name:string,number:integer,img:string


// ! СВЯЗИ:

//* Работаем с миграциями
// ? связь один ко многим
// * дописываем связь для Computers к owner_id

/*
references: {
	model: 'Students',
	key: 'id',
},
onDelete: 'cascade',
allowNull: false,
*/

//!? для логина/майла unique: true,

// login: {
//   type: DataTypes.STRING,
// !  unique: true, // Это делает поле уникальным
// !  allowNull: false // Это делает поле обязательным для заполнения
// },


createdAt: {
  allowNull: false,
  type: Sequelize.DATE,
 //! defaultValue: Sequelize.fn('NOW')
},
updatedAt: {
  allowNull: false,
  type: Sequelize.DATE,
 //! defaultValue: Sequelize.fn('NOW')
}

// * накатываем миграции (npx sequelize db:migrate)

//! Работа со скриптами:

//* Выносим взаимодейтсвие с БД в скрипты

// "mig": "npx sequelize db:migrate",
// "undoMig": "npx sequelize db:migrate:undo:all",
// "remigrate": "npx sequelize db:migrate:undo:all && npx sequelize db:migrate",
// "seed": "npx sequelize db:seed:all",
// "undoSeed": "npx sequelize db:seed:all",
// "createDB": "npx sequelize db:create",
// "dropDB": "npx sequelize db:drop"
//"prep-db": "npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all"

// ! СВЯЗИ: Работаем с моделями

// * компьютеры связаны со студентами так: this.belongsTo(models.Student, { foreignKey: 'owner_id' });
// * студенты связаны со компьютерами так: this.hasMany(models.Computer, { foreignKey: 'owner_id' });

// ! Работаем с сидами

//* создаем каркас сида студентов (npx sequelize-cli seed:generate --name StudentsSeed)
//* создаем каркас сида компкутеров (npx sequelize-cli seed:generate --name ComputersSeed)

//* заполняем данными - см файлы в папке seeders
//* накатываем сиды (npx sequelize db:seed:all) - накатит все сиды

// ? накатить отдельный сид (если нужно) (npx sequelize db:seed --seed 20240304182116-StudentsSeed.js)

//* Выносим сиды в скрипт ("seed": "npx sequelize db:seed:all")

//! -----------CRUD-----CRUD------CRUD-------CRUD--------CRUD----------

//! READ ********************************************************************************************************
//* см crud/read.js


const getComputerWithOwnerInfoById = async (owner_id) => {
    try {
      const response = await Computer.findAll({
        where: { owner_id },
        attributes: ["model"],
      });
      const computers = response.map((el) => el.get({ plain: true }));
      console.log("result ", computers);
    } catch (error) {
      console.log("error ", error);
    }
  };
  
  //************************************************************************************************************* */
  
  const getStudentWithComputersById = async (id) => {
    try {
      const response = await Student.findOne({
        where: { id },
        attributes: ["first_name", "last_name", "createdAt"],
        include: {
          model: Computer,
          attributes: ["id", "model"],
        },
      });
      const student = response.get({ row: true });
      console.log("result ", student);
    } catch (error) {
      console.log("error ", error);
    }

//! CREATE *************************************************************************************************************
//* см crud/create.js

const createStudent = async () => {
  try {
    const student = await Student.create({
      first_name: "Джони",
      last_name: "Джонов",
      age: 45,
    });
    console.log("result ", student);
  } catch (error) {
    console.log("error ", error);
  }
};

//************************************************************************************************************** */

const createComputer = async (model, owner_id) => {
  try {
    await Computer.create({
      model,
      owner_id,
    });
  } catch (error) {
    console.log("error ", error);
  }
};

//! UPDATE ***********************************************************************************************************
//* см crud/update.js

const updateStudentById = async (id, last_name) => {
    try {
      await Student.update(
        {
          last_name,
          age: 777,
        },
        { where: { id } }
      );
      console.log('Updating success');
    } catch (error) {
      console.log('error ', error);
    }
  };

//! DELETE **********************************************************************************************************
//* см crud/delete.js

const deleteStudentById = async (first_name) => {
    try {
      await Student.destroy({
        where: { first_name },
      });
      console.log('Deleting success');
    } catch (error) {
      console.log('error ', error);
    }
  };


  //!  MANY TO MANY ********************************************************************************************************************


//? MANY TO MANY

// * npx sequelize-cli model:generate --name Author --attributes first_name:string,last_name:string
// * npx sequelize-cli model:generate --name Book --attributes title:string,pages_count:integer

//? Миграция для связующей таблицы
// * npx sequelize-cli model:generate --name BooksAuthor --attributes book_id:integer,author_id:integer
// npx sequelize-cli model:generate --name OrdersPaint --attributes order_id:integer,paint_id:integer,quantity:integer

//! Работа с миграциями: правим связи в миграциях только в связующей таблице

//* В промежуточной таблице

// book_id: {
// 	type: Sequelize.INTEGER,
// 	references: {
// 	  model: 'Books',
// 	  key: 'id',
// 	},
//  },
//  author_id: {
// 	type: Sequelize.INTEGER,
// 	references: {
// 	  model: 'Authors',
// 	  key: 'id',
// 	},
//  },

//* В двух главных табоицах никаких референсов не указываем

//! Добавляем дефолтные значения для createdAt и updatedAt

// createdAt: {
// 	allowNull: false,
// 	type: Sequelize.DATE,
// 	defaultValue: Sequelize.fn('NOW'), -- дефолтное значение
//  },
//  updatedAt: {
// 	allowNull: false,
// 	type: Sequelize.DATE,
// 	defaultValue: Sequelize.fn('NOW'), -- дефолтное значение
//  },


//* Накатываем миграции: npm run mig

//* Проверяем диаграмму в бобре

// * ----------------------------------------------------------------
//! Правим связи в моделях

//* Для Book

// class Book extends Model {
// 	static associate({ Author, BooksAuthor }) {
// 	  this.belongsToMany(Author, {
// 		 through: BooksAuthor,
// 		 foreignKey: 'book_id',
// 	  });
// 	}
//  }

//* Для Author

// class Author extends Model {
// 	static associate({ Book, BooksAuthor }) {
// 	  this.belongsToMany(Book, {
// 		 through: BooksAuthor,
// 		 foreignKey: 'author_id',
// 	  });
// 	}
//  }

//* + sedds создаем каркас сида юзеров,  Заполняем данными и накатываем сиды
//! Откат в сидах в противоположном порядке (важно)


//* --------------------------------------------------------
//* Первая функция - просто смотрим на книги

const findAllBooks = async () => {
  const books = await Book.findAll();

  console.log(books);

  console.dir(
    books.map((item) => item.get({ plain: true, nested: true })),
    { depth: null }
  );
};

// findAllBooks();

//* --------------------------------------------------------
//* Вторая функция - смотрим на книги с авторами

const findAllBooksWithAuthors = async () => {
  const books = await Book.findAll({
    include: [
      {
        model: Author,
      },
    ],
  });

  //   console.log(books[0].dataValues.Authors); //! плохо работает

  console.dir(
    books.map((item) => item.get({ plain: true, nested: true })),
    { depth: null }
  );
};

// findAllBooksWithAuthors();

//* --------------------------------------------------------
//* Третья функция - смотрим на книги с авторами, убираем лишние поля

const findAllBooksWithAuthorsSanitized = async () => {
  const books = await Book.findAll({
    attributes: ['title', 'pages_count'],
    include: [
      {
        model: Author,
        attributes: ['id', 'first_name', 'last_name'],
        through: {
          attributes: [],
        },
      },
    ],
  });

  console.dir(
    books.map((item) => item.get({ plain: true, nested: true })),
    { depth: null }
  );
};

// findAllBooksWithAuthorsSanitized();

//* --------------------------------------------------------
//* Четвертая функция - смотрим на авторов с книгами

const findAllAuthors = async () => {
  const authors = await Author.findAll({
    attributes: ['first_name', 'last_name'],
    include: [
      {
        model: Book,
        attributes: ['title'],
        through: {
          attributes: [],
        },
      },
    ],
  });

  console.dir(
    authors.map((item) => item.get({ plain: true, nested: true })),
    { depth: null }
  );
};

// findAllAuthors();

//* --------------------------------------------------------
//* Пятая функция - создадим еще одну запись

const refBookAuthor = async () => {
  await BooksAuthor.create({
    book_id: 1,
    author_id: 4,
  });
};

// refBookAuthor();
// findAllAuthors();

//* --------------------------------------------------------
//* Шестая функция - создадим еще книгу и дадим ей авторов

const createNewBook = async (title, pages_count, authorsIds) => {
  const newBook = await Book.create({
    title,
    pages_count,
  });

  authorsIds.forEach((author) =>
    BooksAuthor.create({ book_id: newBook.id, author_id: author })
  );
};

// createNewBook('Властелин Овец', 1000, [4, 2]);

//* --------------------------------------------------------
//* Седьмая функция - отберем у автора права на книгу

const deleteRelationBookAuthor = async (id) => {
  await BooksAuthor.destroy({
    where: { id },
  });

  console.log('delete relation');
};

// deleteRelationBookAuthor(12);

//! --------------------------------------------------------
//! ДЛЯ ПОЛУЧЕНИЯ КНИГ ПО ОПРЕДЕЛЕННОМУ АВТОРУ

const findBooksByAuthorId = async (authorId) => {
  const books = await Book.findAll({
    include: [
      {
        model: Author,
        where: { id: authorId },
        through: {
          attributes: [],
        },
        attributes: ['id', 'first_name', 'last_name'],
      },
    ],
  });

  console.dir(
    books.map((book) => book.get({ plain: true, nested: true })),
    { depth: null }
  );
};