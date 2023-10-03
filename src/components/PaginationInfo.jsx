import React from "react";
import Wrapper from "@/components/Wrapper";
import { MdArrowBack, MdOutlineArrowForward } from "react-icons/md";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PaginationButton from "./PaginationButton";

export default function PaginationInfo() {
  const { pageNoArr, page, totalCars, hitCount } = useSelector(
    (state) => state.cars
  );
  const { searchPage } = useSelector((state) => state.search);

  const router = useRouter();
  const q = router.query.q;
  const currentPageNo = q ? searchPage : page;

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
            isDisable={currentPageNo === 1}
            currentPageNo={currentPageNo}
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
                currentPageNo={currentPageNo}
                handlePage={() =>
                  handlePage(q ? `?q=${q}&page=${number}` : `?page=${number}`)
                }
              />
            );
          })}

          {/* Previous Page Button */}
          <PaginationButton
            isDisable={currentPageNo === pageNoArr[pageNoArr.length - 1]}
            currentPageNo={currentPageNo}
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
