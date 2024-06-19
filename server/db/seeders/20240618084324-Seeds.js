"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          login: "KARINA123",
          email: "1",
          phone: "88888888888",
          password: "1",
          isAdmin: null,
        },
        {
          login: "Ivan123",
          email: "12",
          phone: "89889889999",
          password: "12",
          isAdmin: null,
        },
        {
          login: "Stepan123",
          email: "123",
          phone: "88888888888",
          password: "123",
          isAdmin: null,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Orders",
      [
        {
          allPrice: null,
          discount: null,
          user_id: 1,
          isForm: null,
          isSent: null,
          isAccept: null,
          address: "Тюмень",
        },
        {
          allPrice: null,
          discount: null,
          user_id: 2,
          isForm: null,
          isSent: null,
          isAccept: null,
          address: "Алматы",
        },
        {
          allPrice: null,
          discount: null,
          user_id: 2,
          isForm: null,
          isSent: null,
          isAccept: null,
          address: "Tbilisy",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "PrimerInsulators",
      [
        {
          priceArea: 150,
          priceVolume: 620,
          name: 'FIR800TR',
          number: 100,
          img: null,
        },
        {
          priceArea: 950,
          priceVolume: 920,
          name: 'FIR900TR',
          number: 20,
          img: null,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Paints",
      [
        {
          priceArea: 700,
          priceVolume: 2500,
          highGrade: false,
          name: 'Ral1013',
          number: 250,
          img: null,
        },
        {
          priceArea: 625,
          priceVolume: 1500,
          highGrade: false,
          name: 'Ral10130',
          number: 150,
          img: null,
        },
        {
          priceArea: 800,
          priceVolume: 3000,
          highGrade: true,
          name: 'Ral222',
          number: 100,
          img: null,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "AcrylicPrimers",
      [
        {
          priceArea: 700,
          priceVolume: 2500,
          name: 'Qre10',
          number: 250,
          img: null,
        },
        {
          priceArea: 625,
          priceVolume: 1500,
          name: 'Qre11',
          number: 150,
          img: null,
        },
        {
          priceArea: 800,
          priceVolume: 3000,
          name: 'Qre17',
          number: 100,
          img: null,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Patinas",
      [
        {
          priceArea: 900,
          priceVolume: 6500,
          name: 'OP1013',
          number: 150,
          img: null,
        },
        {
          priceArea: 700,
          priceVolume: 5500,
          name: 'OP1010',
          number: 150,
          img: null,
        },
        {
          priceArea: 900,
          priceVolume: 1100,
          name: 'Ral222',
          number: 100,
          img: null,
        },
      ],
      {}
    );


    await queryInterface.bulkInsert(
      "Laks",
      [
        {
          priceArea: 1100,
          priceVolume: 2900,
          onlyMdf: false,
          name: 'FO20R865',
          number: 220,
          img: null,
        },
        {
          priceArea: 2000,
          priceVolume: 3000,
          onlyMdf: true,
          name: 'FO20R865',
          number: 200,
          img: null,
        },
        {
          priceArea: 1400,
          priceVolume: 3000,
          onlyMdf: true,
          name: 'FO20R865',
          number: 300,
          img: null,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Grounds",
      [
        {
          priceArea: 900,
          priceVolume: 1100,
          name: 'GLR510',
          number: 20,
          img: 'https://www.renner.ru/upload/resize_cache/iblock/481/450_450_140cd750bba9870f18aada2478b24840a/YC-M408.jpg',
        },
        {
          priceArea: 600,
          priceVolume: 1000,
          name: 'GLR530',
          number: 10,
          img: 'https://www.renner.ru/upload/iblock/58e/YC-M407.jpg',
        },
        {
          priceArea: 700,
          priceVolume: 1500,
          name: 'GLR590',
          number: 10,
          img: 'https://www.renner.ru/upload/iblock/17e/YC-M401.jpg',
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Stains",
      [
        {
          priceArea: 150,
          priceVolume:2000,
          intensity: null,
          name: 'TM009',
          number: 145,
          img: 'https://mk-altera.ru/wp-content/uploads/2018/09/shpon-temnyj-oreh.jpg',
        },
        {
          priceArea: 200,
          priceVolume: 2300,
          intensity: null,
          name: 'TM008',
          number: 111,
          img: 'https://mk-altera.ru/wp-content/uploads/2018/09/shpon-vishnja.jpg',
        },
        {
          priceArea: 210,
          priceVolume: 2500,
          intensity: null,
          name: 'TM006',
          number: 200,
          img: 'https://mk-altera.ru/wp-content/uploads/2018/09/shpon-naturalnyj-dub.jpg',
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Solvents",
      [
        {
          priceArea: 100,
          priceVolume: 326,
          name: 'ndn002',
          number: 300,
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Mdfs",
      [
        {
          primerInsulator_id: null,
          ground_id: null,
          paint_id: null,
          acrylicPrimer_id: null,
          patina_id: null,
          lak_id: null,
          order_id: 1,
        },
       
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Massivs",
      [
        {
          stain_id: null,
          ground_id: null,
          lak_id: null,
          solvent_id: null,
          order_id: 2,
        },
        {
          stain_id: null,
          ground_id: null,
          lak_id: null,
          solvent_id: null,
          order_id: 3,
        },
       
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Massivs", null, {});
    await queryInterface.bulkDelete("Mdfs", null, {});
    await queryInterface.bulkDelete("Solvents", null, {});
    await queryInterface.bulkDelete("Stains", null, {});
    await queryInterface.bulkDelete("Grounds", null, {});
    await queryInterface.bulkDelete("Laks", null, {});
    await queryInterface.bulkDelete("Patinas", null, {});
    await queryInterface.bulkDelete("AcrylicPrimers", null, {});
    await queryInterface.bulkDelete("Paints", null, {});
    await queryInterface.bulkDelete("PrimerInsulators", null, {});
    await queryInterface.bulkDelete("Orders", null, {});
    await queryInterface.bulkDelete("Users", null, {});
    
  },
};
