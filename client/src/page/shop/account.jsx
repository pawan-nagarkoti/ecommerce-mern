import React from "react";
import TabSection from "../../components/tabSection";

export default function Account() {
  return (
    <>
      <div>
        <img
          src="https://picsum.photos/200/300"
          alt=""
          className="w-screen h-[300px]"
        />
      </div>
      <div className="container p-5">
        <TabSection />
      </div>
    </>
  );
}
