document.addEventListener("DOMContentLoaded", () => {
  const ST_INDEX = {
    ST_NUM: 0,
    ST_NAME: 1,
    ST_DEPT: 2,
  };

  //   const st_num = document.querySelector("#st_num");
  //   const st_name = document.querySelector("#st_name");
  //   const st_dept = document.querySelector("#st_dept");
  //   const btn_submit = document.querySelector("form.student.button");

  const form = document.querySelector("form.student");
  // const st_num= document.querySelector("#st_num")
  // const st_name= document.querySelector("#st_name")
  // const st_dept= document.querySelector("#st_dept")
  const btn_submit = document.querySelector("button");

  const inputs = form.querySelectorAll("input");
  const st_num = inputs[ST_INDEX.ST_NUM];
  const st_name = inputs[ST_INDEX.ST_NAME];
  const st_dept = inputs[ST_INDEX.ST_DEPT];

  //여러개의 태그 묶음을 배열로 만들기
  const error_divs = document.querySelectorAll("div.student.error");
  /**
   * 먼저 btn_submit ㅡ이 click event 를 최소한의로 테스트를 하고
   * 이후에 btn_submit null pointer exception 을 ㅇ딜으키는
   * 현상을 방지하기 위해 btn_submit? 형식으로 이후 ㅗ드를 사용한다
   */

  btn_submit?.addEventListener("click", (event) => {
    //표시되었던 에러메세지를 모두 클리어하기
    error_divs.forEach((item) => (item.innerHTML = ""));

    //alert("전송");
    if (!st_num.value) {
      error_divs[ST_INDEX.ST_NUM].innerHTML = "* 학번은 반드시 입력하세요";
      st_num.select();
      return false;
    }

    if (!st_name.value) {
      error_divs[ST_INDEX.ST_NAME].innerHTML = "* 이름은 반드시 입력하세요";
      st_name.select();
      return false;
    }

    if (!st_dept.value) {
      error_divs[ST_INDEX.ST_DEPT].innerHTML = "* 학과는 반드시 입력하세요";
      st_dept.select();
      return false;
    }
    //유효성검사를 마치면 서버로 데이터 보내기
    form.submit(0);
  });
});
