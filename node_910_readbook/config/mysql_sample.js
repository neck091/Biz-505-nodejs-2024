import mysql from "mysql/promise";
const mysql_info = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "00000",
  database: "bookdb2",
};

/**
 * 동기식으로 db연결 설정
 * async()로 시작하고 각 실행 함수 앞에 await를 붙여주면 await로 시작하는 함수가 완료될때까지 블로킹됨
 */
const dbCreate = {
  init: async () => {
    const connection = await mysql.createConnection(mysql_info);
    return connection;
  },
};

export default dbCreate;
