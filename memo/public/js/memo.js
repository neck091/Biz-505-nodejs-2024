document.addEventListener("DOMContentLoaded", () => {
  const date_form = document.querySelector("form.date");
  const input_form = document.querySelector("form.input");
  const btn_save = document.querySelector("input.btn_save");
  const btn_new = document.querySelector("input.btn_new");
  const btn_delete = document.querySelector("button.btn_delete");

  // const toDate = (date_form.querySelector("input.todate").value = json.toDate);
  // const toTime = (date_form.querySelector("input.totime").value = json.toTime);
  const toImage = input_form.querySelector("input.toimage");
  const memo_image = input_form.querySelector("img.memo.image");

  const memo_box = document.querySelector("ul.memo");

  memo_image.addEventListener("click", () => {
    toImage.click();
  });

  toImage.addEventListener("change", (event) => {
    // 파일 열기에서 선택한 파일
    const imageFile = event.target.files[0];

    //URL.createObjectURL 또는 webkitURL.createLbject URLO 함수 중의 하나를 사용하여
    //업로드한 이미지를 가상의 이미지(객체)로 변환하여 화면에 미리보기를 구현하라.
    //이 함수는 csp 정책에 따라 사용이 제한된다
    //이 함수를 사용하려면 wasㅇ서 csp 정책을 일부 풀어줘야 한다.
    const imageURL = (window.URL || webkitURL).createObjectURL(imageFile);
    memo_image_src = imageURL;
  });

  /**한개의 메모를 클릭하면 메모의 seq 값을 ㅏㄱ고 싶다
   * 이때 한개의 메모를 구성하는 요소들은 li,img,span tag 로 되어있다.
   * 어떤 부분을 클릭했을때 메모의 seq 를 알려줄지 만들기 위해서
   * 여러가지 tag에 event를 설정해야한다.
   *
   * 하지만 그러기에는 event 코드가 많이 복잡해 질 수 있다.
   *
   * 여기에서는 ul 태그에 click이벤트를 설정하고
   * target tag가 누구인지를 확인하기 위하여
   * 복수의 class 이름들을 설정하고 class이름에 따라 seq를 얻는 방법을 달리 구현한다.
   *
   * 1. UL tag 에 click event 를 설정하고
   * 2. target 의 클래스리스트에 메모가 포함되어있는지 확인한다.
   * 3. 메모가 포함된 타겟을 알게되면
   * 3-1. 클래스리스트에 리스트가 포함되어있는지 확인한다.
   * 3-2. 만약 클래스 리스트에 리스트가 포함되어있다면 이 타겟은 li태그 이다.
   * 3-3. li tag 에는 data-seq 속성이 설정되어잇으므로 자신의 dataset.seq 값은 getter 된다.
   * 3-4. classList 에 list 가 포함되어잇지 않다면
   * target은 img 이거나 span이다.
   * 3-5. target.closest("LI") 를 실행하여 부모 LI tag 로 부터 dataset.seq를 getter한다.
   */

  memo_box.addEventListener("click", async (e) => {
    const target = e.target;
    const classList = target.classList;
    // alert("rk");
    if (classList.contains("memo")) {
      let seq = 0;
      if (classList.contains("list)")) {
        seq = target.dataset.seq;
      } else {
        seq = target.closest("LI").dataset.seq;
      }
      const res = await fetch(`/${seq}/get`);
      const json = await res.json();
      console.log(json);
      toDate.value = json.m_date;
      toTime.value = json.m_time;
      toSubject.value = json.m_subject;
      toMemo.value = json.m_memo;
      //btn_save는 input tag를 사용한 button 이므로 value 속성을 변경하면 화면에 보이는 텍스트가 변경
      btn_save.value = "수정";
      btn_save.classList.add("update");

      //form input에ㅐ action 을 새롭게 지정하여 데이터 update를 할 수 있도록 한다.
      // input_form.action = `update/${json.m_seq}`;

      input_form.action = `/seq?=${json.m_seq}`;
      btn_delete.nodeType.
    }
  });

  btn_new.addEventListener("click", async () => {
    document.location.reload;
    // try {
    //   const response = await fetch("/get_new_date");
    //   const json = await response.json();
    //   toDate.value = json.toDate;
    //   toTime.value = json.toDate;
    // } catch (error) {
    //   alert("서버 통신오류");
    // }
  });

  btn_save.addEventListener("click", () => {
    const toDate = date_form.querySelector("input.todate"); //value
    const toTime = date_form.querySelector("input.totime"); //value
    // const toSubject = input_form.querySelector("input.tosubject").value;
    // const toMemo = input_form.querySelector("input.tomemo").value;

    /**
     * 저장 버튼을 클릭했을때
     * 저장버튼은 input_form 에 포함되어 있는 버튼
     * 저장버튼을 클릭하면 input_from 에 있는 값은 서버로 전송이 가능하지만
     * date_form 에 있는 값은 함께 보내지 못한다
     * 그래서 date_form 에 있는 2개의 입력박스(toDate, toTime) 을
     * input_form 에 추가하고 같이 보내줘야 한다.
     */
    input_form.appendChild(toDate);
    input_form.appendChild(toTime);
    input_form.submit();

    // console.log(toDate, toTime, toSubject, toMemo);
  });
});
