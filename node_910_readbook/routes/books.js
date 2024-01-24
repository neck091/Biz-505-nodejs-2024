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
   * 정식 도구는 아님
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

router.get("/:isbn/detail", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " SELECT * FROM tbl_books WHERE isbn = ? ";
  dbConn
    .query(sql, isbn)
    .then((rows) => {
      return res.render("books/detail", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.json(err);
    });
});

router.get("/:isbn/delete", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " DELETE FROM tbl_books WHERE isbn = ? ";

  dbConn
    .query(sql, isbn)
    .then((_) => {
      return res.redirect("/books");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

/**
 * 도서정보 자세히 보기에서 수정하기를 클릭했을 때
 * 브라우저의 주소창에 /books/isbn/update 라고 입력했을 때
 * GET / books/ 0003 /update 라고 요청을 했을 때
 *
 * 이 라우터가 요청을 받아서 처리한다.
 *
 * 이 요청은 0003 도서의 정보를 input box에 보여주고 수정할 수 있도록
 * 화면을 보여달라
 *
 * 스토링텔링을 통해 코드를 익혀보자
 */

router.get("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " SELECT * FROM tbl_books WHERE isbn = ? ";

  dbConn
    .query(sql, isbn)
    .then((rows) => {
      return res.render("books/input", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

/**
 * 수정하기 화면에서 input box 에 값을 입력하고 수정하기 버튼을 클릭했을 때
 * post 방식으로 데이터가 전달된다.
 *
 * POST/book/0003/update 로 요청을 할 때
 */
router.post("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const params = {
    isbn: isbn,
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    price: Number(req.body.price),
    discount: Number(req.body.discount),
  };
  /**
   * mysql2/promise 도구에서는 UPDATE SQL 문이 매우 간소해진다
   * UPDATE tbl_books SET title = ?, author = ? 같이 작성해야하는데
   * maysql2 promise에서는 SET 키워드와 함께 JSON type 으로 만들어진 데이터를 통해 update SQL 문이 매우 간소해진다
   *
   * 다만, update를 실행할 때 WHERE 절에 isbn =? 가 필수항목으로 사용해야하므로
   * 쿼리 함수에 전달하는 값은 배열로 2가지를 전달해야 한다.
   */

  const sql = " UPDATE tbl_books SET ? WHERE isbn = ? ";
  dbConn
    .query(sql, [params, isbn])
    .then((_) => {
      return res.redirect(`/books/${isbn}/detail`);
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

export default router;
