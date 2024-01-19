document.addEventListener("DOMContentLoaded", () => {
  const btn_save = document.querySelector("button.btn_save");
  const btn_new = document.querySelector("button.btn_new");
  const btn_list = document.querySelector("button.btn_list");

  btn_save.addEventListener("click", () => {
    document.location.href = "/";
  });

  btn_new.addEventListener("click", () => {
    document.location.href = "/insert";
  });

  btn_list.addEventListener("click", () => {
    document.location.href = "/";
  });
});
