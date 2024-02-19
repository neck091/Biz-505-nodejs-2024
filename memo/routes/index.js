import express from "express";
import moment from "moment";
import DB from "../models/index.js";
import { upload } from "../modules/fileUpload.js";
import e from "express";
const MEMOS = DB.models.tbl_memos;
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  // moment 를 사용하여 현재 날짜와 시간을 문자열로 getter
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("HH:mm:ss");

  try {
    const rows = await MEMOS.findAll();
    return res.render("index", { MEMOS: rows, toDate, toTime });
  } catch (error) {
    return res.json(error);
  }

  //index.pug 를 rendering 할때 사용하도록 보내주기
  // res.render("index", { toDate, toTime });
});

router.post("/", upload.single("m_image"), async (req, res) => {
  console.log(req.body);
  const imageFile = req.file;
  const m_seq = req.auery.seq;

  req.body.m_image = imageFile?.filename;
  req.body.m_author = "hykim6856@gmail.com";
  if (m_seq) {
    await MEMOS.update(req.body, { where: { m_seq } });
  } else {
    await MEMOS.create(req.body);
  }
  try {
    return res.redirect("/");
  } catch (error) {
    return res.json(error);
  }
});

router.post("/update/:seq", upload.single(m_image), async (req, res) => {
  const seq = req.params.seq;
  const imageFile = req.file;

  req.body.m_image = imageFile?.filename;
  req.body.m_author = "hykim6856@gmail.com";
  await MEMOS.update(req.body, { where: { m_seq: seq } });
  return res.redirect("/");
});

router.get("/:seq/get", async (req, res) => {
  const seq = req.params.seq;
  const row = await MEMOS.findByPk(seq);
  return res.json(row);
});

router.get("/get_new_date", async (req, res) => {
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("HH:mm:ss");
  // JSON 의 변수(key) 이름과 value 의 이름이 같을때는 한번 생략 가능
  // return res.json({ todate: todate, toTime: toTime });
  return res.json({ toDate, toTime });
});

export default router;
