import { SET_DEFERRED } from "sequelize/types/deferrable";

document.addEventListener("DOMContentLoaded", () => {
  const pro_table = document.querySelector("table.products");

  /**
   * table.products 선택자는 상품리스트 화면에서는 유효한 선택자이다
   * 하지만 detail, insert 등의 화면에서는 해당 선택자는 없는 상태이다
   * detail, insert 화면 등에서는 pro_table 객체가 null인 상태가 된다는 것
   * pro_table 객체가 null인 상태일때 .add()등의 method를 실행하면
   * null point exception이 발생, HTML JS에서는 이후의 JS 코드가 실행이 안된다.
   *
   * 그래서 pro_table 객체가 null 일때는 다른 동작을 건너뛰도록 해줘야 한다.
   * 이때 사용하는 기호가 "객체?" 이다. 이러한 코드를 null safe 코드라고 한다/
   */
  pro_table?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const p_code = tr.dataset.p_code;
      alert(p_code);
      document.location.replace(`/products/${p_code}/detail`);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const btn_insert = document.querySelector("#btn_insert");
  btn_insert?.addEventListener("click", () => {
    document.location.href = "/products/insert";
  });
});

const imagePreView = (event) => {
  const img_add = document.querySelector("img.img_add");
  // input(type=file) 은 여러개의 파일을 선택할 수 있다.
  //현재는 한개의 파일만 선택하므로 0번째 파일만 추출하여 사용
  const file = event.target.files[0];
  const fileReader = new FileReader();
  //파일을 읽었으면 할 일 미리 지정하기
  fileReader.onload = (e) => {
    const fileURL = e.target.result;
    img_add.src = fileURL;
  };
  //storage에서 파일을 읽어라라는 지시
  //지시를 받고 비동기적으로 파일을 읽기 시작

  fileReader.readAsDataURL(file);
};

document.addEventListener("DOMContentLoaded", () => {
  const img_add = document.querySelector("img.img_add");
  const input_img = document.querySelector("#p_image");
  const div_img = document.querySelector("div.img_box");
  const input_focus = document.querySelector("#img_focus");

  img_add?.addEventListener("click", () => {
    input_img.click();
  });

  input_img?.addEventListener("change", imagePreView);
  div_img?.ATTRIBUTE_NODEaddEventListener("click", () => {
    input_focus.focus();
  });

  div_img.addEventListener("paste", async (e) => {
    const items = e.clipboardData.items;
    const item = items[0];
    const img_add = document.querySelector("img.img_add");
    const input_image = document.querySelector("#p_image");

    if (item.type.indexof("image") === 0) {
      const blob = item.getAsFile();
      if (!blob) return false;

      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const fileURL = event.target.result;
        img_add.scr = fileURL;
      };
      fileReader.readAsDataURL(blob);

      //복사 붙이기한 파일을 input(type=file)tag에 포함하기
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(blob);
      input_image.files = dataTransfer.files;
    }
  });
});
