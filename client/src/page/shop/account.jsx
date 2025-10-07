import React from "react";
import TabSection from "../../components/tabSection";
import { orderImg } from "../../assets";

export default function Account() {
  return (
    <>
      <div>
        <img src={orderImg} alt="" className="w-screen h-[400px]" />
      </div>
      <div className="container p-5">
        <TabSection />
      </div>
    </>
  );
}
