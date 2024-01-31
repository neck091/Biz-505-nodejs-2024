import express from "express";
import DB from "../models/index.js";
const USER = DB.models.tbl_members;
const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  res.send("respond with a resource");
});

/**
 * GET http://localhost:3000/users/join 으로 요청이 되면
 * GET method 요청
 * Browser 의 주소창에 입력한 후 Enter 를 눌러 요청
 * Nav 의 Menu 를 클릭할 때
 * a tag의 링크를 클릭할 때
 */
router.get("/join", async (req, res) => {
  res.render("users/join");
});

/**
 * POST http://localhost:3000/users/join으로 요청이 되면
 * POST method 요청
 * form(method="POST")이 감싸고 있는 input tag에 입력된 값을
 * HTTP Body 에 담아서 서버에 보낼 때
 *
 * Client 가 데이터를 대량으로 보내면서
 * 이 데이터를 처리해줘 라는 요청
 */
router.post("/join", async (req, res) => {
  /**
   * 회원가입요청이들어오면 현재 tbl_members table에서 회원 전체를 조회
   * 조회된 회원이 없으면 지금 요청된 회원이 ADMIN
   * 그렇지 않으면 요청된 회원은 일반 USER이다
   *
   * req.body 데이터에 m_role 이라는 속성을 생성하면서
   * 그 값에 ADMIN 또는 USER 라는 문자열을 저장한다.
   *
   */
  const rows = await USER.findAll();
  if (rows.length > 0) {
    req.body.m_role = "USER";
  } else {
    req.body.m_role = "ADMIN";
  }
  const result = await USER.create(req.body);
  return res.json(result);
});

/**
 * GET http://localhost:3000/users/callor/check라는 요청이 되면
 * callor 라는 사용자 정보가 Table에 저장되어 있냐 라는 것을 묻기
 * 있으면 MESSAGE = FOUND
 * 없으면 MESSAGE = NOT FOUND
 */
router.get("/:username/check", async (req, res) => {
  const username = req.params.username;
  const row = await USER.findByPk(username);
  console.log(row);
  if (row) {
    return res.json({ MESSAGE: "FOUND" });
  } else {
    return res.json({ MESSAGE: "NOT FOUND" });
  }
});

const LOGIN_MESSAGE = {
  USER_NOT: "사용자 ID 없음",
  PASS_WRONG: "비밀번호 오류",
  NEED_LOGIN: "로그인 필요",
};
router.get("/login", (req, res) => {
  const message = req.query.fail;
  return res.render("users/login", { NEED: message });
});

/**
 * 사용자가 login 화면에서 로그인을 실행하면 요청을 처리할 router를 만들고
 * DB 에서 사용자 정보르 조회한 후 DB에 저장된 사용자인지 아닌지 여부를 응답
 */

router.post("/login", async (req, res) => {
  const username = req.body.m_username;
  const password = req.body.m_password;
  const result = await USER.findByPk(username);
  if (!result) {
    //  return res.json({ MESSAGE: "USER NOT FOUND" });
    return res.redirect(`/users/login?fail=${LOGIN_MESSAGE.USER_NOT}`);
  } else if (result.m_username === username && result.m_password !== password) {
    // return res.json({ MESSAGE: "PASSWORD WRONG" });
    return res.redirect(`/users/login?fail=${LOGIN_MESSAGE.PASS_WRONG}`);
  } else {
    /**
     * DB에서 가져온 사용자 정보(result)를 server 의 세션영역에 user라는 이름으로 보관하라
     * 그리고 Session ID를 발행하라
     */

    req.session.user = result;
    return res.redirect("/");
    // return res.json({ MESSAGE: "LOGIN OK" });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  return res.redirect("/");
});

export default router;

/**
 * 회원가입 정책 설정
 * 최초로 가입하는 회원은 ADMIN
 * ADMIN 은 현재 어플리케이션의 모든 기능을 다 사용할 수 있다.
 * 2번째부터 가입하는 회원은 USER
 * USER는 자신의 Mypage와 일부 기능에만 제한적으로 접근할 수 있다.
 */
