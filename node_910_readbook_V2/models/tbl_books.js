import Sequelize from "sequelize";
const book = (sequelize) => {
  const book_table = {
    isbn: {
      type: Sequelize.DataTypes.STRING(13),
      primaryKey: true,
      defaultValue: "",
    },
    title: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
    },
    author: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
    },
    publisher: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
    },
    price: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
    discount: {
      type: Sequelize.DataTypes.INTEGER,
      defaultValue: 0,
    },
  };
  return sequelize.define("tbl_books", book_table, {
    //sequelize 라는 변수를 선언하고, book 함수에서 매개변수로 받은 sequelize를 값으로 세팅
    //단 선언하는 변수명과 세팅하는 값이 담긴 변수명이 같으면 값이 담긴 변수명을 생략할 수 있다
    //sequelize : squelize 이 명령문을 sequelize 만 사용해도 됨.
    sequelize,
    tableName: "tbl_books",
    timestamps: false,
  });
};

export default book;
