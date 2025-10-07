import React, { useEffect, useState } from "react";
import useUI from "../../contexts/UIContext";
import { _get, _post } from "../../lib/api";

export default function ProductDetail() {
  const { isProductId } = useUI();
  const [productData, setProductData] = useState("");
  const [productReview, setProductReview] = useState("");
  const [reviewBox, setReviewBox] = useState("");
  const loginUserDetail = JSON.parse(localStorage.getItem("loginUser"));
  const [hasValidUserForProductReview, setHasValidUserForProductReview] =
    useState("");

  const { setNotifyToTheCart } = useUI();

  const star = [1, 2, 3, 4, 5];
  const [starValue, setStarValue] = useState(0);
  const [howManyTimesClickedFirstStar, setHowManyTimesClickedFirstStar] =
    useState(0);

  const fetchSingleProduct = async () => {
    const res = await _get(`product/single?id=${isProductId}`);
    if (res.status === 200) {
      setProductData(res.data.data);
    }
  };

  const fetchProductReview = async () => {
    try {
      const res = await _get(`/review/fetch/${isProductId}`);
      if (res.status === 200) {
        setProductReview(res);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (isProductId) {
      fetchSingleProduct();
      fetchProductReview();
      isValidUserForProductReview();
    }
  }, [isProductId]);

  const handleProductReview = async (e) => {
    try {
      e.preventDefault();
      const loginUserDetail = JSON.parse(localStorage.getItem("loginUser"));
      const res = await _post("review/add", {
        userId: loginUserDetail.id,
        productId: isProductId,
        username: loginUserDetail.userName,
        reviewMessage: reviewBox,
        reviewRating: starValue,
      });
      if (res.status === 200) {
        setReviewBox("");
        fetchProductReview();
        setStarValue(0);
        setHowManyTimesClickedFirstStar(0);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const isValidUserForProductReview = async () => {
    try {
      const res = await _get(
        `review/checkValidUser?userId=${loginUserDetail?.id}&productId=${isProductId}`
      );
      if (res.status === 200) {
        setHasValidUserForProductReview(res.data);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  // Star logic start here

  const handleStarClicked = (v) => {
    if (v == 1) {
      setHowManyTimesClickedFirstStar((prev) => prev + 1);
    } else {
      setHowManyTimesClickedFirstStar(0);
    }
    setStarValue(v);
  };

  useEffect(() => {
    if (howManyTimesClickedFirstStar > 1) {
      setStarValue(0);
      setHowManyTimesClickedFirstStar(0);
    }
  }, [howManyTimesClickedFirstStar]);

  // star logic end here

  const handleAddToCart = async (price, productID) => {
    try {
      const response = await _post("cart/add", {
        userID: loginUserDetail.id,
        productID: productID,
        price: price,
      });
      if (response.status === 200) {
        setNotifyToTheCart((prev) => !prev);
        alert("Prdocut added on cart");
      }
    } catch (e) {
      console.log(e.message);
      alert(e.response.data.message);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 h-[400px]">
        <div className="relative overflow-hidden">
          <img
            src={productData?.image}
            alt="Product"
            className="h-full w-full object-cover"
          />
        </div>

        <aside className="max-h-screen overflow-y-auto">
          <div className="p-2 md:p-4 space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">
                {productData?.title}
              </h1>
              <p className="text-slate-500">{productData?.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold">${productData?.price}</p>
              {/* <div className="flex items-center gap-2">
                <div className="flex">
                 
                </div>
                <span className="text-sm text-slate-500">(5.00)</span>
              </div> */}
            </div>

            <button
              className="w-full rounded-md bg-slate-900 py-3 text-white font-semibold hover:bg-slate-800 transition"
              onClick={(e) => {
                e.stopPropagation(),
                  handleAddToCart(productData.price, productData._id);
              }}
            >
              Add to Cart
            </button>

            <section className="space-y-4">
              <h2 className="text-xl font-bold">Reviews</h2>
              {hasValidUserForProductReview.check && (
                <form className="pt-4 border-t" onSubmit={handleProductReview}>
                  <p className="font-semibold mb-2">Write a review</p>
                  <div className="flex gap-1 mb-3">
                    {star.map((v, index) => (
                      <svg
                        key={index}
                        onClick={() => handleStarClicked(v)}
                        viewBox="0 0 20 20"
                        className={`w-6 h-6 cursor-pointer transition-colors duration-200 fill-current 
            ${
              v <= starValue
                ? "text-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            }`}
                      >
                        <path d="M10 15.27l-5.18 3.04 1.4-5.81-4.5-3.9 5.93-.5L10 2l2.35 6.1 5.93.5-4.5 3.9 1.4 5.81z" />
                      </svg>
                    ))}
                  </div>
                  <textarea
                    className="w-full rounded-md border border-slate-300 p-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
                    placeholder="Write a review..."
                    value={reviewBox}
                    onChange={(e) => setReviewBox(e.target.value)}
                  ></textarea>

                  <div className="mt-3 flex justify-end">
                    <button
                      className="rounded-md bg-slate-900 px-4 py-2 text-white font-medium hover:bg-slate-800 transition"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              )}

              {productReview?.data?.data?.length > 0 ? (
                productReview?.data?.data.map((v, index) => (
                  <article className="flex gap-3" key={index}>
                    <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold">
                      {v.username.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{v.username}</p>
                        <div className="flex gap-1 mb-3">
                          {star.map((starNumber, index) => (
                            <svg
                              key={index}
                              viewBox="0 0 20 20"
                              className={`w-6 h-6 transition-colors duration-200 fill-current 
            ${
              starNumber <= v.reviewRating ? "text-yellow-400" : "text-gray-300"
            }`}
                            >
                              <path d="M10 15.27l-5.18 3.04 1.4-5.81-4.5-3.9 5.93-.5L10 2l2.35 6.1 5.93.5-4.5 3.9 1.4 5.81z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-slate-600 mt-1 text-[12px]">
                        {v.reviewMessage}
                      </p>
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-center font-bold text-sm">
                  No product review
                </p>
              )}
            </section>
          </div>
        </aside>
      </div>
    </>
  );
}
