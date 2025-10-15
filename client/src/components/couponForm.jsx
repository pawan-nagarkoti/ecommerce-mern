import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { _post, _get } from "@/lib/api";
import useUI from "../contexts/UIContext";
import { _put } from "../lib/api";

export default function CouponForm() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [minimumOrder, setMinimumOrder] = useState("");
  const [useLeft, setUseLeft] = useState("");
  const [expireOn, setExpireOn] = useState("");
  const [active, setActive] = useState(false);
  const {
    setIsSheetOpen,
    hasCouponEditId,
    setHasCouponEditId,
    setHasClickedCouponBtn,
  } = useUI();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const couponObj = {
      title,
      code,
      type,
      value,
      minimumOrder,
      useLeft,
      expireOn,
      active,
    };
    setIsLoading(true);
    try {
      const response = hasCouponEditId
        ? await _put(`coupon/update-coupon/${hasCouponEditId}`, couponObj)
        : await _post(`coupon/add-coupon`, couponObj);

      if (response.data.success) {
        setTitle("");
        setCode("");
        setType("");
        setValue("");
        setMinimumOrder("");
        setUseLeft("");
        setExpireOn("");
        setActive(false);
        setHasClickedCouponBtn((v) => !v);
        setHasCouponEditId(null);
        setIsSheetOpen(false);
      }
    } catch (e) {
      console.log(e.messge);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSingleCoupon = async () => {
    try {
      const res = await _get(`coupon/single-coupon/${hasCouponEditId}`);
      if (res.data.success) {
        const c = res.data.data;
        setTitle(c.title);
        setCode(c.code);
        setType(c.type);
        setValue(c.value);
        setMinimumOrder(c.minimumOrder);
        setUseLeft(c.useLeft);
        setExpireOn(c.expireOn);
        setActive(c.active);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (hasCouponEditId) {
      fetchSingleCoupon();
    }
  }, [hasCouponEditId]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Label htmlFor="title" className="mb-3">
          Title
        </Label>
        <Input
          id="title"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Label htmlFor="code" className="mt-3 mb-3">
          Code
        </Label>
        <Input
          id="code"
          type="text"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <Label htmlFor="code" className="mt-3 mb-3">
          Type
        </Label>
        <select
          className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option defaultValue="" disabled>
            Select type
          </option>
          <option value="Percent">Percent</option>
          <option value="Fixed">Fixed</option>
        </select>

        <Label htmlFor="value" className="mt-3 mb-3">
          Value
        </Label>
        <Input
          id="value"
          type="number"
          name="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Label htmlFor="minimumOrder" className="mt-3 mb-3">
          MinimumOrder
        </Label>
        <Input
          id="minimumOrder"
          type="number"
          name="minimumOrder"
          value={minimumOrder}
          onChange={(e) => setMinimumOrder(e.target.value)}
        />
        <Label htmlFor="useLeft" className="mt-3 mb-3">
          UseLeft
        </Label>
        <Input
          id="useLeft"
          type="number"
          name="useLeft"
          value={useLeft}
          onChange={(e) => setUseLeft(e.target.value)}
        />
        <Label htmlFor="expireOn" className="mt-3 mb-3">
          Expire On
        </Label>
        <Input
          id="expireOn"
          type="date"
          name="expireOn"
          value={expireOn}
          onChange={(e) => setExpireOn(e.target.value)}
        />

        <div className="flex items-center space-x-2 mt-5 mb-6">
          <Switch
            id="airplane-mode"
            checked={active}
            onCheckedChange={(e) => setActive((prev) => !prev)}
          />
          <Label htmlFor="airplane-mode">
            {active ? "Active" : "Disabled"}
          </Label>
        </div>

        <Button type="submit w-full">
          {isLoading
            ? "Loading..."
            : hasCouponEditId
            ? "update coupon"
            : "add coupon"}
        </Button>
      </form>
    </>
  );
}
