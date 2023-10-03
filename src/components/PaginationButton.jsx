function PaginationButton({
  number,
  currentPageNo,
  handlePage,
  children,
  isDisable,
}) {
  if (children) {
    return (
      <button
        disabled={isDisable}
        className={`grid hover:bg-blue-500 hover:text-white  place-items-center h-7 w-7 rounded-lg bg-slate-50 disabled:bg-slate-200 disabled:hover:bg-blue-500 disabled:cursor-not-allowed shadow-lg`}
        onClick={handlePage}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      disabled={number === "..."}
      className={`grid hover:bg-blue-500 hover:text-white disabled:cursor-pointer place-items-center h-7 w-7 rounded-lg  shadow-lg ${
        currentPageNo === number ? "bg-blue-500 text-white" : "bg-slate-50"
      }`}
      onClick={handlePage}
    >
      {number}
    </button>
  );
}

export default PaginationButton;
