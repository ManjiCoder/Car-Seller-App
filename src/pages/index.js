/*
   This Page are redirect to cars page 
*/
import React from "react";
import { Mulish } from "next/font/google";
import { Fragment } from "react";
import HeadSEO from "@/components/HeadSEO";
import CarItem from "@/components/CarItem";

const inter = Mulish({ subsets: ["latin"] });

export default function Home({ cars }) {
  return (
    <Fragment>
      <HeadSEO />
      <main className={`px-16 min-h-screen bg-gray-200 ${inter.className}`}>
        <CarItem cars={cars} />
      </main>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  return {
    redirect: {
      destination: "/cars?page=1",
      permanent: true,
    },
  };
}
