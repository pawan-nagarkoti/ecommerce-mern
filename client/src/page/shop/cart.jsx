import { useEffect, useState } from "react";
import { _get } from "../../lib/api";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const fetchCartData = async () => {
    const loginUserID = JSON.parse(localStorage.getItem("loginUser")).id;
    try {
      const response = await _get(`cart/fetch/${loginUserID}`);
      console.log("res", response.data.data);
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
      <div class="px-5 py-4 space-y-6">
        {cartData?.data?.data?.length > 0 ? (
          cartData?.data?.data?.map((v) => (
            <div class="flex items-start gap-3">
              <img
                src={v.productID.image}
                alt="Kids Tshirt"
                class="h-16 w-16 rounded-md object-cover ring-1 ring-gray-200"
              />

              <div class="flex-1">
                <div class="flex items-start justify-between">
                  <div>
                    <p class="font-semibold leading-5">{v.productID.title}</p>
                  </div>
                  <p class="text-sm font-medium text-gray-800">
                    $ {v.totalPrice}
                  </p>
                </div>

                <div class="mt-2 flex items-center gap-3">
                  <div class="inline-flex items-center rounded border border-gray-200">
                    <button
                      class="px-3 py-1.5 text-lg leading-none hover:bg-gray-50"
                      aria-label="Decrease"
                    >
                      −
                    </button>
                    <span class="px-3 text-sm select-none">{v.quantity}</span>
                    <button
                      class="px-3 py-1.5 text-lg leading-none hover:bg-gray-50"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>

                  <button
                    class="ml-auto p-2 rounded hover:bg-gray-100"
                    aria-label="Remove"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
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

        <div class="flex items-center justify-between border-t pt-4">
          <span class="font-semibold">Total</span>
          <span class="font-semibold">${cartData?.data?.totalAmount}</span>
        </div>

        <button class="w-full rounded-md bg-black px-4 py-3 text-white font-medium hover:opacity-90">
          Checkout
        </button>
      </div>
    </>
  );
}
