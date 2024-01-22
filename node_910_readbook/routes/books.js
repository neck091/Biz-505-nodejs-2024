import express from "express";
import DB from "../config/mysql.js";
const router = express.Router();

/**
 * DB 연결을 시도하는 DB.init  함수는 async 키워드가 부착
 * 이 함수는 동기방식으로 실행
 * 일반적인 변수= db.init 방식으로 return 값을 받을 수 없음
 * .then 방식으로 받아야한다.
 */

let dbConn = null;
//init 함수에 async가 설정되어 동기식으로 작동된다.
//이 함수에 return 값을 받가 위해서는 .then 함수를 통하여 받아야한다.
DB.init().then((connection) => {
  dbConn = connection;
});

console.log("dbConn", dbConn);

router.get("/", (req, res) => {
  const sql = " SELECT * FROM tbl_books ";
  dbConn
    .query(sql)
    //쿼리 함수 실행이 완료되면 .then 함수에게 결과 전달
    .then((rows) => {
      return res.render("books/list", { books: rows[0] });
    })
    //실행 중에 오류나면 전달
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.get("/insert", (req, res) => {
  return res.render("books/input");
});

router.post("/insert", (req, res) => {
  /**
   * mysql2 dependency 도구가 지원하는 확장된 도구
   * 정식 도구는 아님ㅋㅋ
   */
  const sql = " INSERT INTO tbl_books SET ? ";
  const params = {
    isbn: req.body.isbn,
    title: req.body.title,
    publisher: req.body.publisher,
    author: req.body.author,
    price: Number(req.body.price),
    discount: Number(req.body.discount),
  };
  dbConn
    .query(sql, params)
    .then((_) => {
      return res.redirect("/books");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
  //return res.json(params);
});

export default router;
