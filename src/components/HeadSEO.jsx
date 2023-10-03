import Head from "next/head";
import React from "react";

export default function HeadSEO({ title, description, tag }) {
  return (
    <Head>
      {title ? title : <title>Car Seller App</title>}
      <meta name="description" content={description ? description : "Hi Mom"} />
      {tag && tag}
    </Head>
  );
}
