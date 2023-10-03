import React from "react";

export default function Wrapper({ children }) {
  return (
    <section className="py-4 px-7 rounded-3xl shadow-md capitalize bg-gray-200 brightness-105 flex items-center justify-start space-x-7">
      {children}
    </section>
  );
}
