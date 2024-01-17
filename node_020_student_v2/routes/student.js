import express from "express";

const router = express.Router();

// localhost:3000/student/
router.get("/", (req, res) => {
  res.render("student/list");
});

router.post("/insert", (req, res) => {
  res.render("student/input");
});

export default router;
