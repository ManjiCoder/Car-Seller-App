import React from "react";
import Wrapper from "@/components/Wrapper";
import { MdArrowBack, MdOutlineArrowForward } from "react-icons/md";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function PaginationInfo() {
  const { pageNoArr, page, totalCars, hitCount } = useSelector(
    (state) => state.cars
  );
  const { searchPage } = useSelector((state) => state.search);

  const router = useRouter();
  const q = router.query.q;

  let showRemainingCarsNo = q ? hitCount * searchPage : hitCount * page;
  if (router.query.page === pageNoArr.slice(-1).toString()) {
    showRemainingCarsNo = totalCars;
  }

  const handlePage = (url) => {
    router.push(url);
  };

  return (
    <Wrapper>
      <section className="font-medium w-full flex justify-between space-x-3 items-center">
        <div>{`${showRemainingCarsNo} from ${totalCars}`}</div>

        <div className="flex items-center space-x-3">
          {/* Previous Page Button */}
          <PaginationButton
            currentPageNo={q ? searchPage : page}
            handlePage={() =>
              handlePage(
                q ? `?q=${q}&page=${searchPage - 1}` : `?page=${page - 1}`
              )
            }
          >
            <MdArrowBack />
          </PaginationButton>
          {pageNoArr.map((number) => {
            return (
              <PaginationButton
                key={number}
                number={number}
                currentPageNo={q ? searchPage : page}
                handlePage={() =>
                  handlePage(q ? `?q=${q}&page=${number}` : `?page=${number}`)
                }
              />
            );
          })}
          {/* Previous Page Button */}
          <PaginationButton
            currentPageNo={q ? searchPage : page}
            handlePage={() =>
              handlePage(
                q ? `?q=${q}&page=${searchPage + 1}` : `?page=${page + 1}`
              )
            }
          >
            <MdOutlineArrowForward />
          </PaginationButton>
        </div>
      </section>
    </Wrapper>
  );
}

function PaginationButton({ number, currentPageNo, handlePage, children }) {
  const { pageNoArr } = useSelector((state) => state.cars);
  if (children) {
    return (
      <button
        disabled={
          pageNoArr.indexOf(currentPageNo) === pageNoArr.length - 1 ||
          pageNoArr.indexOf(currentPageNo) === 0
        }
        className={`grid hover:invert  place-items-center h-7 w-7 rounded-lg bg-slate-50 disabled:cursor-not-allowed shadow-lg`}
        onClick={handlePage}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      disabled={number === "..."}
      className={`grid hover:invert disabled:cursor-pointer place-items-center h-7 w-7 rounded-lg bg-slate-50 shadow-lg ${
        currentPageNo === number && "invert"
      }`}
      onClick={handlePage}
    >
      {number}
    </button>
  );
}
