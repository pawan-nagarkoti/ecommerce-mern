import { useEffect, useState } from "react";
import { DataTable } from "./customTable";
import { _delete, _get, _put } from "../lib/api";
import { Button } from "@/components/ui/button";
import useUI from "../contexts/UIContext";

export default function CouponTable() {
  const [couponData, setCouponData] = useState([]);
  const [isDeleteLoader, setIsDeleteLoader] = useState(false);
  const { setIsSheetOpen, setHasCouponEditId, hasClickedCouponBtn } = useUI();

  const fetchCoupon = async () => {
    try {
      const response = await _get("coupon/all-coupon");
      if (response.data.success) {
        setCouponData(response.data.data);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchCoupon();
  }, [setIsSheetOpen, hasClickedCouponBtn]);

  const deleteCoupon = async (id) => {
    setIsDeleteLoader(true);
    try {
      const res = await _delete(`coupon/delete-coupon/${id}`);
      if (res.data.success) {
        fetchCoupon();
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsDeleteLoader(false);
    }
  };

  const couponHeaderTable = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "value",
      header: "Value",
    },
    {
      accessorKey: "minimumOrder",
      header: "Minimum Order",
    },
    {
      accessorKey: "useLeft",
      header: "Use Left",
    },
    {
      accessorKey: "expireOn",
      header: "Expire On",
    },
    {
      accessorKey: "active",
      header: "Active",
      cell: ({ row }) => (
        <div
          className={`rounded-2xl text-[12px] py-1.5  font-bold text-center ${
            row.original.active
              ? "bg-green-200 text-green-900"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {row.original.active ? "active" : "disabled"}
        </div>
      ),
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const data = row?.original;
        return (
          <div>
            <Button
              size="sm"
              variant="outline"
              className="text-[12px] cursor-pointer"
              onClick={() => {
                setHasCouponEditId(data._id);
                setIsSheetOpen(true);
              }}
            >
              edit
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="mx-1.5 text-[12px] cursor-pointer"
              onClick={() => deleteCoupon(data._id)}
            >
              {isDeleteLoader ? "Loading.." : "delete"}
            </Button>
          </div>
        );
      },
    },
  ];
  return <DataTable data={couponData} columns={couponHeaderTable} />;
}
