document.addEventListener("DOMContentLoaded", () => {
  const btn_list = document.querySelector("button.btn_list");
  const btn_update = document.querySelector("button.btn_update");
  const btn_delete = document.querySelector("button.btn_delete");

  btn_list.addEventListener("click", () => {
    document.location.href = "/student";
  });

  btn_delete.addEventListener("click", (e) => {
    if (confirm("삭제하면 복구 ㄴ\n ㄱㅊ?")) {
      const target = e.target;
      /**
       * html tag 에 data-변수명="값" 형식으로 지정한 속성은 html 에서 JS로 변수를 전달하는 방법 중의 하나이다
       * 이값을 js 에서 추출할 때는 저장변수= tag.datset.변수와 같이 사용함
       * target.dataset.num : 현재 클릭돈 tag에 data-num로 설정된 값을 가져와라
       */
      const st_num = target.dataset.num;
      //alert(st_num);
      document.location.replace(`/student/${st_num}/delete`);
    }
  });

  btn_update.addEventListener("click", (e) => {
    const st_num = e.target.dataset.num;
    if (st_num) {
      document.location.replace(`/student/${st_num}/update`);
    } else {
      alert("학번 정보 잘못됨");
    }
  });
});
