import express from "express";
const router = express.Router();

//localhots:3000/memo
router.get("/", (req, res) => {
  res.render("memo");
});

router.get("/write", (req, res) => {
  res.send("Memo Writer");
});

router.get("/write/today", (req, res) => {
  res.send("Memo today");
});

export default router;
