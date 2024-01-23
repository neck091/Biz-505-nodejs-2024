document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector("table.books tbody");
  tbody.addEventListener("click", (e) => {
    //target은 td 태그
    const target = e.target;
    if (target.tagName === "TD") {
      //클릭된 TD 의 부모 TR을 selector 하라
      const parTr = target.closest("TR");
      const isbn = parTr.dataset.isbn;

      //document.location.href= `/books/${isbn}/detail`;
      document.location.replace(`/books/${isbn}/detail`);
    }
  });
});
