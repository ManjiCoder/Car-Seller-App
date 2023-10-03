import React, { Fragment, useEffect } from "react";
import { Mulish } from "next/font/google";
import CarItem from "@/components/CarItem";
import Navbar from "@/components/Navbar";
import HeadSEO from "@/components/HeadSEO";
import {
  currentPage,
  setCars,
  setHitCount,
  setPageNoArr,
  setTotalCars,
} from "@/store/features/carSlice";
import { useDispatch } from "react-redux";
import { limit, options } from "@/utils/imports";
import { currentSearchPage } from "@/store/features/searchSlice";

const inter = Mulish({ subsets: ["latin"] });

export default function Cars({ totalCars, page, cars, query, hitCount }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTotalCars(totalCars));
    dispatch(setHitCount(hitCount));
    dispatch(setCars(cars));
    dispatch(setPageNoArr(Math.round(totalCars / limit)));
    if (query === "name") {
      dispatch(currentSearchPage(page));
    } else {
      dispatch(currentPage(page));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cars]);

  return (
    <Fragment>
      <HeadSEO />
      <main className={`px-16 min-h-screen bg-gray-200 ${inter.className}`}>
        <Navbar />
        <CarItem />
      </main>
    </Fragment>
  );
}

// SSR - Server Side Rendering
export async function getServerSideProps(context) {
  let page = context.query.page || 1;
  let name = context.query.q;
  let query = "page";
  let url = `${process.env.BASE_URL}/api/cars?page=${page}`;
  if (name) {
    query = "name";
    url = `${process.env.BASE_URL}/api/cars/search?q=${name}&page=${page}`;
  }
  let response = await fetch(url, options);

  let data = await response.json();
  // console.log(data);
  return {
    props: {
      totalCars: data.totalCars,
      hitCount: data.hitCount,
      page,
      cars: data.cars,
      query,
    },
  };
}
