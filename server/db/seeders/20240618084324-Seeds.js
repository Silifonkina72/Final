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

    // await queryInterface.bulkInsert(
    //   "Orders",
    //   [
    //     {
    //       allPrice: null,
    //       user_id: 1,
    //       isForm: true,
    //       isSent: false,
    //       isAccept: false,
    //       address: "Тюмень",
    //     },
    //     {
    //       allPrice: null,
    //       user_id: 2,
    //       isForm: null,
    //       isSent: null,
    //       isAccept: null,
    //       address: "Алматы",
    //     },
    //     {
    //       allPrice: null,
    //       user_id: 2,
    //       isForm: true,
    //       isSent: false,
    //       isAccept: false,
    //       address: "Tbilisy",
    //     },
    //   ],
    //   {}
    // );

    await queryInterface.bulkInsert(
      "PrimerInsulators",
      [
        {
          priceArea: 155,
          priceVolume: 1030,
          name: "Грунт изолятор FI R800NTR",
          number: 100,
          img: "https://www.renner.ru/upload/iblock/610/FI-R800_NTR.jpg",
        },
        {
          priceArea: 285,
          priceVolume: 1900,
          name: "Грунт изолятор FI M199NTR",
          number: 20,
          img: "https://www.renner.ru/upload/iblock/8f0/FI-M199_NTR.jpg",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Paints",
      [
        {
          priceArea: 450,
          priceVolume: 1800,
          highGrade: true,
          name: "Эмаль FO25R810RaL1013",
          number: 250,
          img: "https://akkras.ru/upload/iblock/1e0/1e0d5ccfde64017796277aa80a365c22.jpg",
        },
        {
          priceArea: 450,
          priceVolume: 1800,
          highGrade: false,
          name: "Эмаль FO25R810RaL1015",
          number: 150,
          img: "https://akkras.ru/upload/iblock/479/4791fe41f50dd95eabdd8aab6cc05b8c.jpg",
        },
        {
          priceArea: 450,
          priceVolume: 1800,
          highGrade: true,
          name: "Эмаль FO25R810RaL9001",
          number: 100,
          img: "https://akkras.ru/upload/iblock/69a/69af4ad213e9e548c6902750a024753c.jpg",
        },
        {
          priceArea: 450,
          priceVolume: 1800,
          highGrade: false,
          name: "Эмаль FO25R810RaL9002",
          number: 100,
          img: "https://akkras.ru/upload/iblock/eca/eca153b3d2eacb8010ab9ad1eadfbcaa.jpg",
        },
        {
          priceArea: 450,
          priceVolume: 1800,
          highGrade: true,
          name: "Эмаль FO25R810RaL9003",
          number: 100,
          img: "https://akkras.ru/upload/iblock/0a8/0a88215dd90d93c32ea28fbc819b3cb6.jpg",
        },
        {
          priceArea: 450,
          priceVolume: 1800,
          highGrade: false,
          name: "Эмаль FO25R810RaL9010",
          number: 100,
          img: "https://akkras.ru/upload/iblock/6f5/6f50287927e294f850618a5b6c686996.jpg",
        },
        {
          priceArea: 450,
          priceVolume: 1800,
          highGrade: false,
          name: "Эмаль FO25R810RaL9016",
          number: 100,
          img: "https://akkras.ru/upload/iblock/d2d/d2dc474db143c7debdb58149d09ff462.jpg",
        },
        {
          priceArea: 625,
          priceVolume: 2500,
          highGrade: true,
          name: "Эмаль FO25M060RaL1000",
          number: 30,
          img: "https://akkras.ru/upload/iblock/9d1/9d190796a1faf5c19c0b62823c7e29d9.jpg",
        },
        {
          priceArea: 625,
          priceVolume: 2500,
          highGrade: false,
          name: "Эмаль FO25M060RaL1001",
          number: 30,
          img: "https://akkras.ru/upload/iblock/669/66978b745fad4c4a4787545d0f41896d.jpg",
        },
        {
          priceArea: 625,
          priceVolume: 2500,
          highGrade: true,
          name: "Эмаль FO25M060RaL1002",
          number: 30,
          img: "https://akkras.ru/upload/iblock/b8d/b8d49a6e23ab4cc7cc6e7e27fbc8929e.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL1003",
          number: 80,
          img: "https://akkras.ru/upload/iblock/850/850fdcda5493729c11718c41a6cf2eab.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL1004",
          number: 80,
          img: "https://akkras.ru/upload/iblock/477/477a4a3cbe9a58a3270bd053b87c1cd1.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL1005",
          number: 80,
          img: "https://akkras.ru/upload/iblock/b91/b917e9b65986a8c2e31e819aa18fbbb5.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL1006",
          number: 80,
          img: "https://akkras.ru/upload/iblock/986/986719ea26b0f394d4ce1bbe4809ee8b.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL1007",
          number: 80,
          img: "https://akkras.ru/upload/iblock/fb0/fb0de56b859336d3a85822d8034857c5.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL1011",
          number: 80,
          img: "https://akkras.ru/upload/iblock/9bb/9bba52fb67d2de5d9ff012a091b3dddc.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL1012",
          number: 7,
          img: "https://akkras.ru/upload/iblock/9dd/9dd5e9ac4c4d736c1514875e6ada01cc.jpg",
        },
        {
          priceArea: 625,
          priceVolume: 2500,
          highGrade: true,
          name: "Эмаль FO25M060RaL1014",
          number: 7,
          img: "https://akkras.ru/upload/iblock/abc/abcdc30270f2c4eac9420a07d4ecc66e.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL1016",
          number: 7,
          img: "https://akkras.ru/upload/iblock/83c/83c256c26a6c1ddfb483539253e478c3.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL1017",
          number: 7,
          img: "https://akkras.ru/upload/iblock/b32/b320d5d72065b7cc7ba0b8103772b1e0.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL1018",
          number: 69,
          img: "https://akkras.ru/upload/iblock/73b/73b2b5f8f1521aa27f80d297952ffba2.jpg",
        },
        {
          priceArea: 629,
          priceVolume: 2500,
          highGrade: true,
          name: "Эмаль FO25M060RaL1019",
          number: 90,
          img: "https://akkras.ru/upload/iblock/ee0/ee074f8acfed5b0ec4d7cec4e76b4f2b.jpg",
        },
        {
          priceArea: 625,
          priceVolume: 2500,
          highGrade: false,
          name: "Эмаль FO25M060RaL1020",
          number: 90,
          img: "https://akkras.ru/upload/iblock/770/770055cdc52c5ae31748f9635cc5255c.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL1021",
          number: 60,
          img: "https://akkras.ru/upload/iblock/4f0/4f09c15d3806b8a3ab76777710721c72.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL1023",
          number: 60,
          img: "https://akkras.ru/upload/iblock/b7d/b7d783b54fccfbd488d6dad5fbe5d6cb.jpg",
        },
        {
          priceArea: 625,
          priceVolume: 2500,
          highGrade: true,
          name: "Эмаль FO25M060RaL1024",
          number: 60,
          img: "https://akkras.ru/upload/iblock/6d7/6d7b9bad49c97ee6ccc9241afcc2c520.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL2001",
          number: 60,
          img: "https://akkras.ru/upload/iblock/25e/25ef9cb46e76268ccc745620e29117b8.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL2002",
          number: 40,
          img: "https://akkras.ru/upload/iblock/b5e/b5e03f8ba3fca6d77fd4075f5bab0781.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL2003",
          number: 20,
          img: "https://akkras.ru/upload/iblock/c32/c326e7ff0d4aefdcb1f44458c548ee7c.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL2004",
          number: 60,
          img: "https://akkras.ru/upload/iblock/a65/a65987bc3ef23011e0449113f5791fed.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL2008",
          number: 60,
          img: "https://akkras.ru/upload/iblock/0f3/0f33799ed015607f69975b79f5d7f75f.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL2009",
          number: 60,
          img: "https://akkras.ru/upload/iblock/c99/c99a207e0e09e3dd427da720f56ffb4b.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL2010",
          number: 70,
          img: "https://akkras.ru/upload/iblock/859/85920aad10919c4ff5c8c6776e752e64.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL2011",
          number: 30,
          img: "https://akkras.ru/upload/iblock/08b/08bce57c3a29a82b2523a93039a6ad3b.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL2011",
          number: 30,
          img: "https://akkras.ru/upload/iblock/4c8/4c838334640c476dce988598d4f0db88.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL3000",
          number: 30,
          img: "https://akkras.ru/upload/iblock/666/6663478e72309720d7be929217224447.jpg ",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL3001",
          number: 30,
          img: "https://akkras.ru/upload/iblock/b04/b046312a2fa183626104c110897af93e.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL3002",
          number: 30,
          img: "https://akkras.ru/upload/iblock/910/910ad07dde365f0181f00041d22b97b6.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL3003",
          number: 60,
          img: "https://akkras.ru/upload/iblock/ffd/ffdcf60f0944e165ec5a6159a9bbdeb7.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL3004",
          number: 60,
          img: "https://akkras.ru/upload/iblock/8a2/8a2d6e2559bfef6eca8b4896125c3b99.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL3005",
          number: 12,
          img: "https://akkras.ru/upload/iblock/8df/8df28a2ab1d6e1b1b79afda0c846141a.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL3007",
          number: 12,
          img: "https://akkras.ru/upload/iblock/365/365a6deb7af9d9de495e13164dd7381a.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: true,
          name: "Эмаль FO25M060RaL3009",
          number: 52,
          img: "https://akkras.ru/upload/iblock/9fe/9fe4e1f39ac25782dc3f00ddd44d97bb.jpg",
        },
        {
          priceArea: 1000,
          priceVolume: 4000,
          highGrade: false,
          name: "Эмаль FO25M060RaL3011",
          number: 52,
          img: "https://akkras.ru/upload/iblock/e6e/e6e10008d3f0bf237b8fa9a49160c9aa.jpg",
        },
        {
          priceArea: 625,
          priceVolume: 2500,
          highGrade: false,
          name: "Эмаль FO25M060RaL3012",
          number: 12,
          img: "https://akkras.ru/upload/iblock/344/344ca585c2362bd7dbaa25f38edb99ec.jpg",
        },
        {
          priceArea: 625,
          priceVolume: 2500,
          highGrade: true,
          name: "Эмаль FO25M060RaL4005",
          number: 12,
          img: "https://akkras.ru/upload/iblock/355/3550017a56e5dd5c0d387c5d8245f5de.jpg",
        },
        {
          priceArea: 625,
          priceVolume: 2500,
          highGrade: false,
          name: "Эмаль FO25M060RaL5000",
          number: 10,
          img: "https://akkras.ru/upload/iblock/355/355a4bf71e71b8287493e8dc176ae445.jpg",
        },
        {
          priceArea: 625,
          priceVolume: 2500,
          highGrade: false,
          name: "Эмаль FO25M060RaL5001",
          number: 5,
          img: "https://akkras.ru/upload/iblock/426/426acb5ff873d2effbb696c6301b131f.jpg",
        },
        {
          priceArea: 625,
          priceVolume: 2500,
          highGrade: true,
          name: "Эмаль FO25M060RaL6022",
          number: 5,
          img: "https://akkras.ru/upload/iblock/010/010393d93ce0d22032392960a8ea2610.jpg",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "AcrylicPrimers",
      [
        {
          priceArea: 327,
          priceVolume: 1307,
          name: "Акриловый грунт JL R510",
          number: 27,
          img: "https://www.renner.ru/upload/iblock/e2d/JL-R510.jpg",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Patinas",
      [
        {
          priceArea: 257,
          priceVolume: 2568,
          name: "Патина Нитро GM M048C01 (черная)",
          number: 90,
          img: "https://www.renner.ru/upload/iblock/cc3/GM_M048_C_01.png",
        },
        {
          priceArea: 257,
          priceVolume: 2568,
          name: "Патина Нитро GM M048C02 (белая)",
          number: 20,
          img: "https://www.renner.ru/upload/iblock/c00/GM_M048_C_02.png",
        },
        {
          priceArea: 318,
          priceVolume: 3178,
          name: "Патина Нитро GM M048C03 (красная)",
          number: 20,
          img: "https://www.renner.ru/upload/iblock/ad4/GM_M048_C_03.png",
        },
        {
          priceArea: 257,
          priceVolume: 2568,
          name: "Патина Нитро GM M048C04 (синяя)",
          number: 20,
          img: "https://www.renner.ru/upload/iblock/3d6/GM_M048_C_04.png",
        },
        {
          priceArea: 280,
          priceVolume: 2792,
          name: "Патина Нитро GM M048C07 (желтая)",
          number: 20,
          img: "https://www.renner.ru/upload/iblock/d9a/GM_M048_C_07.png",
        },
        {
          priceArea: 267,
          priceVolume: 2666,
          name: "Патина Нитро GM M048С10 (вишня)",
          number: 7,
          img: "https://www.renner.ru/upload/iblock/ac4/GM_M048_C_10.png",
        },
        {
          priceArea: 238,
          priceVolume: 2378,
          name: "Патина Нитро GM M048С20 (светлый орех)",
          number: 7,
          img: "https://www.renner.ru/upload/iblock/fd8/GM_M048_C_20.png",
        },
        {
          priceArea: 238,
          priceVolume: 2378,
          name: "Патина Нитро GM M048С23 (орех)",
          number: 5,
          img: "https://www.renner.ru/upload/iblock/49b/GM_M048_C_23.png",
        },
        {
          priceArea: 257,
          priceVolume: 2568,
          name: "Патина Нитро GM M048С34 (коричневый)",
          number: 44,
          img: "https://www.renner.ru/upload/iblock/fb1/GM_M048_C_34.png",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Laks",
      [
        {
          priceArea: 227,
          priceVolume: 907,
          onlyMdf: false,
          name: "Лак ПУ Тиксотропный FO20R829 20% блеска",
          number: 210,
          img: "https://www.renner.ru/upload/iblock/dee/FO-XXR829.jpg",
        },
        {
          priceArea: 227,
          priceVolume: 907,
          onlyMdf: false,
          name: "Лак ПУ Тиксотропный FO40R829 40% блеска",
          number: 120,
          img: "https://www.renner.ru/upload/iblock/dee/FO-XXR829.jpg",
        },
        {
          priceArea: 248,
          priceVolume: 992,
          onlyMdf: false,
          name: "Лак ПУ самогрунтующийся FL25M306 25% блеска",
          number: 30,
          img: "https://www.renner.ru/upload/iblock/a6d/FL-XXM306.jpg",
        },
        {
          priceArea: 248,
          priceVolume: 992,
          onlyMdf: false,
          name: "Лак ПУ самогрунтующийся FL10M306 10% блеска",
          number: 10,
          img: "https://www.renner.ru/upload/iblock/a6d/FL-XXM306.jpg",
        },
        {
          priceArea: 248,
          priceVolume: 1137,
          onlyMdf: true,
          name: "Лак акриловый JO10R553",
          number: 22,
          img: "https://www.renner.ru/upload/iblock/bf4/JO-XXR553.jpg",
        },
        {
          priceArea: 408,
          priceVolume: 1634,
          onlyMdf: false,
          name: "Лак паркетный ПУ FO20M050 20% блеска",
          number: 42,
          img: "https://www.renner.ru/upload/iblock/196/FO-XXM050.jpg",
        },
        {
          priceArea: 408,
          priceVolume: 1634,
          onlyMdf: false,
          name: "Лак паркетный ПУ FO40M050 40% блеска",
          number: 42,
          img: "https://www.renner.ru/upload/iblock/196/FO-XXM050.jpg",
        },
        {
          priceArea: 380,
          priceVolume: 1520,
          onlyMdf: true,
          name: "Акриловый лак JO15M072 15% блеска",
          number: 39,
          img: "https://www.renner.ru/upload/iblock/48c/JO-XXM072.jpg",
        },
        {
          priceArea: 380,
          priceVolume: 1520,
          onlyMdf: true,
          name: "Акриловый лак JO50M072 50% блеска",
          number: 45,
          img: "https://www.renner.ru/upload/iblock/48c/JO-XXM072.jpg",
        },
        {
          priceArea: 225,
          priceVolume: 1020,
          onlyMdf: false,
          name: "Полиакриловый лак самогрунтующий JO20S700 20% блеска",
          number: 33,
          img: "https://www.renner.ru/upload/iblock/db4/JO-XXS700.jpg",
        },
        {
          priceArea: 494,
          priceVolume: 1974,
          onlyMdf: true,
          name: "Акриловый лак JO03M077 3% блеска",
          number: 11,
          img: "https://www.renner.ru/upload/iblock/b18/JO-03M077.jpg",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Grounds",
      [
        {
          priceArea: 153,
          priceVolume: 653,
          name: "Грунт ПУ Тиксотропный FL R829",
          number: 20,
          img: "https://renner25.ru/static/img/0000/0004/3917/43917041.1128rushv7.jpg?1",
        },
        {
          priceArea: 196,
          priceVolume: 782,
          name: "Грунт Нитро NL M001",
          number: 10,
          img: "https://renner25.ru/static/img/0000/0004/3917/43917041.1128rushv7.jpg?1",
        },
        {
          priceArea: 140,
          priceVolume: 558,
          name: "Грунт FL R809",
          number: 10,
          img: "https://renner25.ru/static/img/0000/0004/3917/43917037.jv40e7bccw.jpg?1",
        },
        {
          priceArea: 213,
          priceVolume: 850,
          name: "Грунт ПУ Прмиум FL M006",
          number: 54,
          img: "https://www.renner.ru/upload/iblock/df3/FL-M006.jpg",
        },
        {
          priceArea: 327,
          priceVolume: 1307,
          name: "Грунт Акриловый JL R510",
          number: 54,
          img: "https://www.renner.ru/upload/iblock/e2d/JL-R510.jpg",
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Stains",
      [
        {
          priceArea: 90,
          priceVolume: 3600,
          intensity: null,
          name: "Renner TM M006T01 (Черная)",
          number: 145,
          img: "https://renner.ru/upload/iblock/9f9/TM_M006_T01.png",
        },
        {
          priceArea: 95,
          priceVolume: 3793,
          intensity: null,
          name: "Renner TM M006T02 (белая)",
          number: 111,
          img: "https://renner.ru/upload/iblock/906/TM_M006_T02.png",
        },
        {
          priceArea: 138,
          priceVolume: 5507,
          intensity: null,
          name: "Renner TM M006T03 (красная)",
          number: 200,
          img: "https://renner.ru/upload/iblock/165/TM_M006_T03.png",
        },
        {
          priceArea: 86,
          priceVolume: 3444,
          intensity: null,
          name: "Renner TM M006T07 (желтая)",
          number: 200,
          img: "https://renner.ru/upload/iblock/1bd/TM_M006_T07.png",
        },
        {
          priceArea: 79,
          priceVolume: 3444,
          intensity: null,
          name: "Renner TM M006T15 (красное дерево)",
          number: 110,
          img: "https://renner.ru/upload/iblock/562/TM_M006_T15.png",
        },
        {
          priceArea: 95,
          priceVolume: 3793,
          intensity: null,
          name: "Renner TM M006T16 (коричневый орех)",
          number: 80,
          img: "https://renner.ru/upload/iblock/078/TM_M006_T16.png",
        },
        {
          priceArea: 60,
          priceVolume: 2384,
          intensity: null,
          name: "TM M006T19 (старинный орех)",
          number: 60,
          img: "https://renner.ru/upload/iblock/e93/TM_M006_T19.png",
        },
        {
          priceArea: 83,
          priceVolume: 3296,
          intensity: null,
          name: "Renner TM M006T20 (светлый орех)",
          number: 60,
          img: "https://renner.ru/upload/iblock/6ad/TM_M006_T20.png",
        },
        {
          priceArea: 95,
          priceVolume: 3793,
          intensity: null,
          name: "Renner TM M006T21 (бренерский орех)",
          number: 60,
          img: "https://renner.ru/upload/iblock/a31/TM_M006_T21.png",
        },
        {
          priceArea: 77,
          priceVolume: 3084,
          intensity: null,
          name: "Renner TM M006T22 (орех)",
          number: 30,
          img: "https://renner.ru/upload/iblock/a96/TM_M006_T22.png",
        },
        {
          priceArea: 87,
          priceVolume: 3459,
          intensity: null,
          name: "Renner TM M006T24 (розовое дерево)",
          number: 70,
          img: "https://renner.ru/upload/iblock/94b/24.png",
        },
        {
          priceArea: 68,
          priceVolume: 2735,
          intensity: null,
          name: "Renner TM M006T10 (вишня)",
          number: 40,
          img: "https://renner.ru/upload/iblock/0a4/TM_M006_T10.png",
        },
        {
          priceArea: 94,
          priceVolume: 3745,
          intensity: null,
          name: "Renner TM M006T34 (венге)",
          number: 36,
          img: "https://renner.ru/upload/iblock/de5/TM_M006_T34.png",
        },
        {
          priceArea: 108,
          priceVolume: 4300,
          intensity: null,
          name: "Renner TM M006T04 (синий)",
          number: 12,
          img: "https://renner.ru/upload/iblock/87a/t62.png",
        },
        {
          priceArea: 108,
          priceVolume: 4300,
          intensity: null,
          name: "Renner TM M006M09 (зеленый)",
          number: 26,
          img: "https://renner.ru/upload/iblock/7a3/m09.png",
        },
      ],
      {}
    );

    // await queryInterface.bulkInsert(
    //   "OrdersAcrylicPrimers",
    //   [
    //     // Для первого заказа
    //     {
    //       order_id: 1,
    //       acrylicPrimer_id: 1,
    //       quantity: 1,
    //     },
       
    //    // Для второго заказа
    //     {
    //       order_id: 1,
    //       acrylicPrimer_id: 1,
    //       quantity: 1,
    //     },
    //   ],
    //   {}
    // );

    // await queryInterface.bulkInsert(
    //   "OrdersLaks",
    //   [
    //     // Для первого заказа
    //     {
    //       order_id: 1,
    //       lak_id: 1,
    //       quantity: 1,
    //     },
       
    //     //Для второго заказа
    //     {
    //       order_id: 2,
    //       lak_id: 2,
    //       quantity: 1,
    //     },
    //   ],
    //   {}
    // );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("OrdersAcrylicPrimers", null, {});
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
