import { useEffect, useId, useState } from "react";
import { _delete, _get, _post, _put } from "../../lib/api";
import useUI from "../../contexts/UIContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const { setNotifyToTheCart } = useUI();
  const navigate = useNavigate();
  const { setIsOpenCart, isSelectedAddress } = useUI();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const fetchCartData = async () => {
    const loginUserID = JSON.parse(localStorage.getItem("loginUser")).id;

    try {
      const response = await _get(`cart/fetch/${loginUserID}`);
      setCartData(response);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, []);

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
    try {
      const response = await _put("cart/update", {
        id: id,
        sign: value,
        price: price,
      });

      if (response.status === 200) {
        fetchCartData();
      }
    } catch (e) {
      console.log(e.message);
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
      const userId = JSON.parse(localStorage.getItem("loginUser")).id;
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
        totalAmount: item?.totalAmount,
        orderDate: Date.now(),
        orderUpdateDate: Date.now(),
      };

      const res = await _post("order/add", cartData);
      if (res.status === 200) {
        navigate("/shop/account");
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="px-5 py-4 space-y-6">
        {cartData?.data?.data?.length > 0 ? (
          cartData?.data?.data?.map((v, index) => (
            <div className="flex items-start gap-3" key={index}>
              <img
                src={v.productID.image}
                alt="Kids Tshirt"
                className="h-16 w-16 rounded-md object-cover ring-1 ring-gray-200"
              />

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold leading-5">
                      {v.productID.title}
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
                      className="px-3 py-1.5 text-lg leading-none hover:bg-gray-50"
                      aria-label="Decrease"
                      onClick={() =>
                        handleQuantity(v._id, "decrement", v.price)
                      }
                    >
                      −
                    </button>
                    <span className="px-3 text-sm select-none">
                      {v.quantity}
                    </span>
                    <button
                      className="px-3 py-1.5 text-lg leading-none hover:bg-gray-50"
                      aria-label="Increase"
                      onClick={() =>
                        handleQuantity(v._id, "increment", v.price)
                      }
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
          ))
        ) : (
          <p>No data found</p>
        )}

        {cartData?.data?.data?.length > 0 && (
          <>
            <div className="flex items-center justify-between border-t pt-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">
                ₹{Math.floor(cartData?.data?.totalAmount)}
              </span>
            </div>

            <button
              className="w-full rounded-md bg-black px-4 py-3 text-white font-medium hover:opacity-90"
              onClick={() => {
                location.pathname === "/shop/checkout"
                  ? handleCheckout(cartData?.data)
                  : navigate("checkout");
                setIsOpenCart(false);
              }}
            >
              {isLoading ? "Loading..." : "Checkout"}
            </button>
          </>
        )}
      </div>
    </>
  );
}
