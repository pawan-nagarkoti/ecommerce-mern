import React, { use, useEffect, useState } from "react";
import { _get, _put } from "../lib/api";
import { orderStatusList } from "../lib/constant";
import { Loader } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function OrderModal({ orderId = "" }) {
  const [orderData, setOrderData] = useState("");
  const [isOrderStatusValue, setIsOrderStatusValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const fetchSingleOrder = async () => {
    try {
      setIsLoading(true);
      const res = await _get(`order/single/${orderId}`);
      if (res.status === 200) {
        setOrderData(res);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSingleOrder();
  }, []);

  const updateOrderStatus = async () => {
    const res = await _put(
      `order/update/${orderId}/${orderData?.data?.data?.userId}`,
      {
        orderStatus: isOrderStatusValue,
      }
    );
    if (res.status === 200) {
      fetchSingleOrder();
    }
  };

  useEffect(() => {
    if (isOrderStatusValue && orderId) {
      updateOrderStatus();
    }
  }, [isOrderStatusValue]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {/* <!-- Order meta --> */}
          <dl className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8">
            <div className="flex items-start justify-between sm:col-span-2">
              <dt className="text-sm text-gray-600">Order ID</dt>
              <dd className="text-sm font-medium text-gray-900">
                {orderData?.data?.data?._id}
              </dd>
            </div>
            <div className="flex items-start justify-between">
              <dt className="text-sm text-gray-600">Order Date</dt>
              <dd className="text-sm font-medium text-gray-900">
                {orderData?.data?.data?.orderDate}
              </dd>
            </div>
            <div className="flex items-start justify-between">
              <dt className="text-sm text-gray-600">Order Price</dt>
              <dd className="text-sm font-medium text-gray-900">
                $ {orderData?.data?.data?.totalAmount}
              </dd>
            </div>
            <div className="flex items-start justify-between">
              <dt className="text-sm text-gray-600">Payment method</dt>
              <dd className="text-sm font-medium text-gray-900">
                {orderData?.data?.data?.paymentMethod}
              </dd>
            </div>
            <div className="flex items-start justify-between">
              <dt className="text-sm text-gray-600">Payment Status</dt>
              <dd className="text-sm font-medium text-gray-900">
                {orderData?.data?.data?.paymentStatus}
              </dd>
            </div>
            <div className="flex items-start justify-between">
              <dt className="text-sm text-gray-600">Order Status</dt>
              <dd>
                {orderStatusList.map((c, index) => (
                  <React.Fragment key={index}>
                    {orderData?.data?.data?.orderStatus === c.statusName && (
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          borderRadius: "9999px",
                          backgroundColor: c.colorName,
                          padding: "0.25rem 0.75rem",
                          fontSize: "0.75rem",
                          lineHeight: "1rem",
                          fontWeight: 500,
                          color: "#fff",
                          boxShadow: "inset 0 0 0 1px rgba(5,150,105,0.20)",
                        }}
                      >
                        {orderData?.data?.data?.orderStatus}
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </dd>
            </div>
          </dl>

          {/* <!-- Divider --> */}
          <hr className="my-6 border-gray-200" />

          {/* <!-- Order details row --> */}
          <div>
            <h3 className="text-base font-semibold">Order Details</h3>
            {orderData?.data?.data?.cartItems.map((v, index) => (
              <div
                className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm"
                key={index}
              >
                <p>
                  <span className="text-gray-500">Title:</span>{" "}
                  <span className="font-medium text-gray-900">{v.title}</span>
                </p>
                <p>
                  <span className="text-gray-500">Quantity:</span>{" "}
                  <span className="font-medium text-gray-900">
                    {v.quantity}
                  </span>
                </p>
                <p>
                  <span className="text-gray-500">Price:</span>{" "}
                  <span className="font-medium text-gray-900">${v.price}</span>
                </p>
              </div>
            ))}
          </div>

          {/* <!-- Divider --> */}
          <hr className="my-6 border-gray-200" />

          {/* <!-- Shipping info --> */}
          <div>
            <h3 className="text-base font-semibold">Shipping Info</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-800">
              <li>{orderData?.data?.data?.addressInfo?.address}</li>
              <li>{orderData?.data?.data?.addressInfo?.city}</li>
              <li>{orderData?.data?.data?.addressInfo?.pincode}</li>
              <li>{orderData?.data?.data?.addressInfo?.phone}</li>
              <li>{orderData?.data?.data?.addressInfo?.notes}</li>
            </ul>
          </div>
        </div>
      )}

      {location?.pathname === "/admin/order" && (
        <>
          <hr className="my-6 border-gray-200" />
          <div>
            <h3 className="text-base font-semibold">Order Status</h3>
            <div className="relative mt-2">
              <select
                id="order-status"
                name="orderStatus"
                defaultValue=""
                className="block w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-9 text-sm text-gray-900 shadow-sm outline-none
               focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500
               dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-100"
                onChange={(e) => setIsOrderStatusValue(e.target.value)}
              >
                <option value="" disabled>
                  Choose status…
                </option>
                {orderStatusList?.map((v) => (
                  <option key={v.statusName} value={v.statusName}>
                    {v.statusName}
                  </option>
                ))}
              </select>

              {/* chevron */}
              <svg
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.24a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" />
              </svg>
            </div>
          </div>
        </>
      )}
    </>
  );
}
