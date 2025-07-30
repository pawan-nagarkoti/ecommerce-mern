import React from "react";

export default function FilterTag(data) {
  return (
    <>
      <h2 className="text-center text-2xl mb-5">{data?.title}</h2>
      <div className="grid grid-cols-5 gap-8 justify-center">
        {data?.items?.map((v, i) => (
          <div className="cursor-pointer flex justify-center items-center flex-col gap-3 shadow-sm p-5 rounded">
            <v.icon />
            <div>{v?.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}
