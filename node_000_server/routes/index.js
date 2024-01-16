import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "cjstk_05@naver.com Express" });
});

export default router;
