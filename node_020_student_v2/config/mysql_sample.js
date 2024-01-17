import mysql from "mysql2";

/**
 * Json(Java script object notation) type의 객체 (json 데이터, json)
 * 속성데이터가 `변수명 : 값` 형식으로 구성된다.
 * KEY:balue pair type 데이터 라고 한다.
 */

const mysql_info = {
  host: "localhost",
  user: "root",
  database: "schooldb",
  port: "3306",
  passward: "!Biz8080",
};

const dbCreate = {
  init: () => {
    return mysql.createConnection(mysql_info);
  },
};
export default dbCreate;
