import React from "react";
import Cart from "./cart";
import Address from "./Address";

export default function Checkout() {
  return (
    <>
      <div>
        <img
          src="https://picsum.photos/200/300"
          alt=""
          className="w-screen h-[300px]"
        />
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-12 mt-5 p-5">
        <div className="md:col-span-8">
          <Address />
        </div>
        <div className="md:col-span-4">
          <Cart />
        </div>
      </div>
    </>
  );
}
