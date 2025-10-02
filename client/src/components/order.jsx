import React, { useEffect, useState } from "react";
import Table from "./tableContainer";
import TableContainer from "./tableContainer";
import { _get } from "../lib/api";
import { LoaderIcon } from "lucide-react";

export default function Order() {
  const [isOrderData, setIsOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      const res = await _get("order/fetch");
      if (res.data.success) {
        setIsOrderData(res);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);
  return (
    <>
      <p className="font-extrabold my-5">Order History</p>
      {isLoading ? (
        <LoaderIcon />
      ) : isOrderData?.data?.data?.length > 0 ? (
        <TableContainer item={isOrderData.data.data} />
      ) : (
        <p>Order list not found</p>
      )}
    </>
  );
}
