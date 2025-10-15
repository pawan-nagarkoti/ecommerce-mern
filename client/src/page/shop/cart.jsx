import { useEffect, useId, useState } from "react";
import { _delete, _get, _post, _put } from "../../lib/api";
import useUI from "../../contexts/UIContext";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/loding";
import useCookie from "../../hooks/useCookie";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const { setNotifyToTheCart } = useUI();
  const navigate = useNavigate();
  const { setIsOpenCart, isSelectedAddress } = useUI();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [hasCartDataLoading, setHasCartDataLoading] = useState(false);
  const [hasQuantityUpdate, setHasQuantityUpdate] = useState(0);
  const [quantityUpateLoader, setQuntityUpdateLoader] = useState(false);
  const [isCoupons, setIsCoupons] = useState([]);
  const [couponValue, setCouponValue] = useState("");

  const { addCookie, getCookie, deleteCookie } = useCookie();

  const fetchCartData = async () => {
    setHasCartDataLoading(true);

    try {
      const response = await _get(
        `cart/fetch/${getCookie("loginUserInfo").id}`
      );
      setCartData(response);
    } catch (e) {
      console.log(e.message);
    } finally {
      setHasCartDataLoading(false);
    }
  };

  const handleDeleteCartItem = async (id) => {
    try {
      const response = await _delete(`cart/delete/${id}`);
      if (response.status === 200) {
        fetchCartData();
        setNotifyToTheCart((prev) => !prev);
        alert("Product deleted");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleQuantity = async (id, value, price) => {
    setQuntityUpdateLoader(true);
    try {
      const response = await _put("cart/update", {
        id: id,
        sign: value,
        price: price,
      });

      if (response.status === 200) {
        setHasQuantityUpdate(response.data.data);
      }
    } catch (e) {
      console.log(e.message);
      alert(e.response.data.message);
    } finally {
      setQuntityUpdateLoader(false);
    }
  };

  const handleCheckout = async (item) => {
    if (!isSelectedAddress) return alert("select address");

    const cartItems = item.data.map((v) => ({
      productID: v.productID._id,
      title: v.productID.title,
      image: v.productID.image,
      price: v.productID.price,
      quantity: v.quantity,
    }));

    setIsLoading(true);
    try {
      const userId = getCookie("loginUserInfo")?.id;
      const cartData = {
        userId: userId,
        cartItems: cartItems,
        addressInfo: {
          addressId: isSelectedAddress._id,
          address: isSelectedAddress.address,
          city: isSelectedAddress.city,
          pincode: isSelectedAddress.pincode,
          phone: isSelectedAddress.phone,
          notes: isSelectedAddress.notes,
        },
        orderStatus: "Pending",
        paymentMethod: "Credit Card",
        paymentStatus: "Paid",
        totalAmount: getCookie("totalAmountAfterCoupon")
          ? getCookie("totalAmountAfterCoupon")
          : item?.totalAmount,
        orderDate: Date.now(),
        orderUpdateDate: Date.now(),
      };

      const res = await _post("order/add", cartData);
      if (res.status === 200) {
        navigate("/shop/account");
        deleteCookie("totalAmountAfterCoupon");
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCouponItems = async () => {
    try {
      const res = await _get("coupon/all-coupon");
      if (res.data.success) {
        setIsCoupons(res);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchCartData();
    fetchCouponItems();
  }, []);

  const handleCouponApply = async () => {
    try {
      const res = await _post("coupon/apply-coupon", {
        code: couponValue,
      });

      if (res.data.success) {
        addCookie("totalAmountAfterCoupon", res.data.totalAfterDiscount);
      }
    } catch (e) {
      console.log(e.message);
      alert(e.response.message);
    }
  };
  return (
    <>
      {hasCartDataLoading ? (
        <div className="px-5 py-10 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="px-5 py-4 space-y-6">
          {cartData?.data?.data?.length > 0 ? (
            <>
              {cartData.data.data.map((v, index) => (
                <div className="flex items-start gap-3" key={v._id ?? index}>
                  <img
                    src={v.productID?.image}
                    alt={v.productID?.title ?? "Product image"}
                    className="h-20 w-16 rounded-md object-cover ring-1 ring-gray-200"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold leading-5">
                          {v.productID?.title}
                        </p>
                        <p className="font-extralight text-[10px]">
                          ₹ {Math.floor(v.price)}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-800">
                        ₹ {Math.floor(v.totalPrice)}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center gap-3">
                      <div className="inline-flex items-center rounded border border-gray-200">
                        <button
                          className={`px-3 py-1.5 text-lg leading-none hover:bg-gray-50 ${
                            quantityUpateLoader
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          aria-label="Decrease"
                          onClick={() =>
                            handleQuantity(v._id, "decrement", v.price)
                          }
                          disabled={quantityUpateLoader}
                        >
                          −
                        </button>
                        <span className="px-3 text-sm select-none">
                          {v._id === hasQuantityUpdate._id
                            ? hasQuantityUpdate.quantity
                            : v.quantity}
                        </span>
                        <button
                          className={`px-3 py-1.5 text-lg leading-none hover:bg-gray-50 ${
                            quantityUpateLoader
                              ? "cursor-not-allowed"
                              : "cursor-pointer"
                          }`}
                          aria-label="Increase"
                          onClick={() =>
                            handleQuantity(v._id, "increment", v.price)
                          }
                          disabled={quantityUpateLoader}
                        >
                          +
                        </button>
                      </div>

                      <button
                        className="ml-auto p-2 rounded hover:bg-gray-100"
                        aria-label="Remove"
                        onClick={() => handleDeleteCartItem(v._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M3 6h18M8 6v-.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V6m-8 0h8m-9 3 1 10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2l1-10M10 11v7m4-7v7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponValue || ""}
                  className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => setCouponValue(e.target.value)}
                />
                <Button className="mt-1" onClick={handleCouponApply}>
                  apply
                </Button>
              </div>

              <div className="mt-6 border border-gray-200 rounded-md p-4">
                <h3 className="text-lg font-semibold mb-3">
                  Available Coupons
                </h3>

                {/* coupon items */}
                <div className="flex flex-col gap-3">
                  {isCoupons?.data?.data?.length > 0 ? (
                    isCoupons?.data?.data?.map((v, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between border p-3 rounded hover:bg-gray-50 transition cursor-pointer"
                      >
                        <div>
                          <p className="font-medium text-[14px]">
                            {v.title} {v.value}{" "}
                            {v.type === "Percent" ? "%" : ""}
                          </p>
                          <p className="text-xs text-gray-500">
                            Use code{" "}
                            <span className="font-semibold">{v.code}</span> on
                            orders above {v.minimumOrder}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>no coupons found</p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-between border-t pt-4 ${
                  getCookie("totalAmountAfterCoupon") ? "line-through" : ""
                }`}
              >
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  ₹{Math.floor(cartData?.data?.totalAmount ?? 0)}
                </span>
              </div>

              {getCookie("totalAmountAfterCoupon") && (
                <div className="flex items-center justify-between">
                  <span className="font-semibold">After Coupon Applied</span>
                  <span className="font-semibold">
                    ₹{getCookie("totalAmountAfterCoupon")}
                  </span>
                </div>
              )}

              <button
                className="w-full rounded-md bg-black px-4 py-3 text-white font-medium hover:opacity-90"
                onClick={() => {
                  location.pathname === "/shop/checkout"
                    ? handleCheckout(cartData?.data)
                    : navigate("checkout");
                  setIsOpenCart(false);
                }}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Checkout"}
              </button>
            </>
          ) : (
            <p>No data found</p>
          )}
        </div>
      )}
    </>
  );
}
