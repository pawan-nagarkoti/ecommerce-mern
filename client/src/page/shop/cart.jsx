import { useEffect, useState } from "react";
import { _get } from "../../lib/api";
import useUI from "../../contexts/UIContext";

export default function Cart() {
  const [cartData, setCartData] = useState([]);

  const fetchCartData = async () => {
    const loginUserID = JSON.parse(localStorage.getItem("loginUser")).id;

    try {
      const response = await _get(`cart/fetch/${loginUserID}`);
      console.log(response.data.data.length);
      setCartData(response);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchCartData();
  }, []);
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
                  </div>
                  <p className="text-sm font-medium text-gray-800">
                    $ {v.totalPrice}
                  </p>
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <div className="inline-flex items-center rounded border border-gray-200">
                    <button
                      className="px-3 py-1.5 text-lg leading-none hover:bg-gray-50"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span className="px-3 text-sm select-none">
                      {v.quantity}
                    </span>
                    <button
                      className="px-3 py-1.5 text-lg leading-none hover:bg-gray-50"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="ml-auto p-2 rounded hover:bg-gray-100"
                    aria-label="Remove"
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

        <div className="flex items-center justify-between border-t pt-4">
          <span className="font-semibold">Total</span>
          <span className="font-semibold">${cartData?.data?.totalAmount}</span>
        </div>

        <button className="w-full rounded-md bg-black px-4 py-3 text-white font-medium hover:opacity-90">
          Checkout
        </button>
      </div>
    </>
  );
}
