import React from "react";

export default function OrderModal() {
  return (
    <>
      {/* <!-- Header --> */}
      <h2 class="text-xl font-semibold">Order Summary</h2>

      {/* <!-- Order meta --> */}
      <dl class="mt-6 grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-8">
        <div class="flex items-start justify-between sm:col-span-2">
          <dt class="text-sm text-gray-600">Order ID</dt>
          <dd class="text-sm font-medium text-gray-900">
            66cce517b3cedd7ac9e9178b
          </dd>
        </div>
        <div class="flex items-start justify-between">
          <dt class="text-sm text-gray-600">Order Date</dt>
          <dd class="text-sm font-medium text-gray-900">2024-08-26</dd>
        </div>
        <div class="flex items-start justify-between">
          <dt class="text-sm text-gray-600">Order Price</dt>
          <dd class="text-sm font-medium text-gray-900">$1250</dd>
        </div>
        <div class="flex items-start justify-between">
          <dt class="text-sm text-gray-600">Payment method</dt>
          <dd class="text-sm font-medium text-gray-900">paypal</dd>
        </div>
        <div class="flex items-start justify-between">
          <dt class="text-sm text-gray-600">Payment Status</dt>
          <dd class="text-sm font-medium text-gray-900">paid</dd>
        </div>
        <div class="flex items-start justify-between">
          <dt class="text-sm text-gray-600">Order Status</dt>
          <dd>
            <span class="inline-flex items-center rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
              confirmed
            </span>
          </dd>
        </div>
      </dl>

      {/* <!-- Divider --> */}
      <hr class="my-6 border-gray-200" />

      {/* <!-- Order details row --> */}
      <div>
        <h3 class="text-base font-semibold">Order Details</h3>
        <div class="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm">
          <p>
            <span class="text-gray-500">Title:</span>{" "}
            <span class="font-medium text-gray-900">Kids Tshirt</span>
          </p>
          <p>
            <span class="text-gray-500">Quantity:</span>{" "}
            <span class="font-medium text-gray-900">5</span>
          </p>
          <p>
            <span class="text-gray-500">Price:</span>{" "}
            <span class="font-medium text-gray-900">$250</span>
          </p>
        </div>
      </div>

      {/* <!-- Divider --> */}
      <hr class="my-6 border-gray-200" />

      {/* <!-- Shipping info --> */}
      <div>
        <h3 class="text-base font-semibold">Shipping Info</h3>
        <ul class="mt-2 space-y-1 text-sm text-gray-800">
          <li>sangam1</li>
          <li>India</li>
          <li>Kolkata</li>
          <li>TYH678</li>
          <li>236598855</li>
          <li>Notes</li>
        </ul>
      </div>

      {/* <!-- Divider --> */}
      <hr class="my-6 border-gray-200" />
      <div>
        <h3 class="text-base font-semibold">Order Status</h3>
        <p>dropdown</p>
      </div>
    </>
  );
}
