const express = "express";
const bodyParser = "body-parser";
const { check } = "hanspell-js";

app.use(express.json());

app.post("/spellcheck", async (req, res) => {
  try {
    const text = req.body.text;
    const result = await hanspell.spellCheck(text);
    res.json({ result });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error occurred during spell check" });
  }
});

export default index;
