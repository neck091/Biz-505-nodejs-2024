document.addEventListener("DOMContentLoaded", () => {
  const pro_table = document.querySelector("table.products");
  pro_table.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "TD") {
      const tr = target.closest("TR");
      const p_code = tr.dataset.p_code;
      alert(p_code);
      document.location.replace(`/products/${p_code}/detail`);
    }
  });
});
