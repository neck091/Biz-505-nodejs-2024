import express from "express";
import DB from "../models/index.js";
import moment from "moment";
import { upLoad } from "../modules/file_upload.js";
const router = express.Router();
const MEMO = DB.models.tbl_memo;

/* GET home page. */
router.get("/", async (req, res, next) => {
  const today = moment().format("YYYY-MM-DD");
  const time = moment().format("hh:mm:ss");
  const rows = await MEMO.findAll({
    order: [["m_seq", "DESC"]],
  });

  res.render("memo", { today: today, time: time, MEMO: rows });
});

router.post("/", upLoad.single("m_image"), async (req, res) => {
  let mSeq = req.body.m_seq;
  if (!mSeq) {
    const rows = await MEMO.findAll({ order: [["m_seq", "DESC"]], limit: 1 });
    mSeq = rows[0].m_seq;
    mSeq = Number(mSeq) + 1;
    req.body.m_seq = mSeq;
  }
  req.body.m_date = moment().format("YYYY-MM-DD");
  req.body.m_time = moment().format("hh:mm:ss");

  const file = req.file;
  if (file) {
    req.body.m_image_name = file.fieldname;
    req.body.m_image_origin_name = file.originalname;
  }
  try {
    await MEMO.create(req.body);
    return res.redirect("/");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/insert", (req, res, next) => {
  return res.render("input");
});

router.get("/:m_memo/detail", async (req, res, next) => {
  const m_memo = req.params.m_memo;
  const row = await MEMO.findByPk(m_memo);
  return res.render("detail", { MEMO: row });
});

export default router;
