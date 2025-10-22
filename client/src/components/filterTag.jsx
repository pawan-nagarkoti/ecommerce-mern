import React from "react";
import { useNavigate } from "react-router-dom";

export default function FilterTag(props) {
  const navigate = useNavigate();
  const searchBy = props.tagname === "category" ? `category=` : `brand=`;
  return (
    <>
      <h2 className="text-center text-2xl mb-5">{props?.title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 justify-center ">
        {props?.items?.map((v, i) => (
          <div
            className="cursor-pointer flex justify-center items-center flex-col gap-3 shadow-sm p-5 rounded"
            key={i}
            onClick={() =>
              navigate(`/shop/listing?${searchBy}${v.label}`, { replace: true })
            }
          >
            <v.icon />
            <div>{v?.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}
