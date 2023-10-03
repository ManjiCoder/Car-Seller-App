import Head from "next/head";
import React from "react";

export default function HeadSEO({ title, description, tag }) {
  return (
    <Head>
      {title ? title : <title>Car Seller App</title>}
      <meta
        name="description"
        content={
          description
            ? description
            : "Discover, buy, and sell cars effortlessly with our car seller app."
        }
      />
      {tag && tag}
    </Head>
  );
}
