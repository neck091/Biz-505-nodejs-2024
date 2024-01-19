import express from "express";
import DB from "../document/mysql.js";
const router = express.Router();
const dbConn = DB.init();

router.get("/insert", (req, res) => {
  res.render("book/input.pug");
});

router.post("/insert", (req, res) => {
  const isbn = req.body.isbn;
  const title = req.body.title;
  const publisher = req.body.publisher;
  const author = req.body.author;
  const price = req.body.price;

  const params = [isbn, title, publisher, author, price];
  const sql = " INSERT INTO tbl_books( isbn, title, publisher, author, price ) " + " VALUES( ?,?,?,?,? )";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect("/");
    }
  });
});

router.get("/:isbn/detail", (req, res) => {
  const isbn = req.params.isbn;
  console.log(isbn);
  const params = [isbn];
  const sql = " SELECT * FROM tbl_student WHERE isbn = ? ";
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.render("book/detail", { B: result[0] });
    }
  });
});

export default router;
