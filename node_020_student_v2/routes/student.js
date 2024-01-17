import express from "express";

//mysql.js에서 선언하고 export한  dbcreate를
//import하여 DB라는 이름으로 사용하겠다
import DB from "../config/mysql.js";

const router = express.Router();
//DBCreate에서 선언된 init() 함수를 호출하여
//return 된 정보를 dbConn변수에 저장하라
const dbConn = DB.init();

// localhost:3000/student/
router.get("/", (req, res) => {
  const sql = "SELECT * FROM tbl_student";
  dbConn.query(sql, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // return res.json(result);
      return res.render("student/list", { stList: result });
    }
  });
});

//GET: lacalhost:3000/student/insert
router.get("/insert", (req, res) => {
  res.render("student/input");
});

//POST: lacalhost:3000/student/insert
router.post("/insert", (req, res) => {
  //form을 통해 전달된 데이터를 (임시) 변수에 저장해두기
  const st_num = req.body.st_num;
  const st_name = req.body.st_name;
  const st_dept = req.body.st_dept;

  //DB에 insert 하기 위해 배열 type으로 변환
  // const params =[req.body.st_num, req.body.st_name, req.body.st_dept]
  const params = [st_num, st_name, st_dept];
  const sql = " INSERT INTO tbl_student(st_num, st_name, st_dept) " + " VALUES( ?, ?, ?) ";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // INSERT가 성공한 경우 LIST를 보여주는 화면으로 화면 전환
      return res.redirect("/student/");
    }
  });
});

// get 요청을 하면 주소 중간에 끼워넣어진 학번을 st_num 변수를 통하여 받아라
router.get("/:st_num/detail", (req, res) => {
  //주소에 포함되어 전달된 값읋 변수에 저장
  const st_num = req.params.st_num;
  const params = [st_num];
  const sql = " SELECT * FROM tbl_student WHERE st_num = ? ";
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // return res.json(result);
      return res.render("student/detail", { STD: result[0] });
    }
  });
});

export default router;
