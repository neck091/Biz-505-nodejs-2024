import mysql from "mysql2";

const mysql_info = {
  host: "localhost",
  user: "****",
  database: "****",
  port: "3306",
  passward: "****",
};

const dbCreate = {
  init: () => {
    console.log("MySQL Connection!!!");
    return mysql.createConnection(mysql_info);
  },
};
export default dbCreate;
