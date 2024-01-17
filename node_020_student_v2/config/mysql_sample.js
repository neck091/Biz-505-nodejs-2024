import mysql from "mysql2";

/**
 *  사용하는 MySQl 의 database, user, password 를 입력한 후
 * 이 파일(mysql_sample.js)를 mysql.js로 복사한 후 프로젝트를 실행
 */
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
