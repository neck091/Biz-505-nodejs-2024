import express from "express";
import DB from "../document/mysql.js";
const router = express.Router();
const dbConn = DB.init();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const sql = "SELECT * FROM tbl_books";
  dbConn.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.render("book/list", { bList: result });
    }
  });
});

router.get("/insert", (req, res) => {
  res.render("book/input.pug");
});

export default router;
