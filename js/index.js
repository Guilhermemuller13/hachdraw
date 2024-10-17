const changeModeRef = document.querySelector("#change-mode");
const changePageNext = document.querySelector("#next-page");
const changePageNextLot = document.querySelector("#next-lot-page");
const changePagePrev = document.querySelector("#prev-page");
const changePagePrevLot = document.querySelector("#prev-lot-page");

window.onload = () => {
  // event listener handle change mode drawer - view or draw
  changeModeRef.addEventListener("click", handleChangeModeDrawer);

  //start event listener handle change paginate
  changePageNext.addEventListener("click", () =>
    handlePaginateDraw("next-page")
  );
  changePageNextLot.addEventListener("click", () =>
    handlePaginateDraw("next-lot-page")
  );
  changePagePrev.addEventListener("click", () =>
    handlePaginateDraw("prev-page")
  );
  changePagePrevLot.addEventListener("click", () =>
    handlePaginateDraw("prev-lot-page")
  );

  //set first page on load page
  paginateDrawService(currentPage);
};
