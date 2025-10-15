import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { _post } from "@/lib/api";
import useUI from "../contexts/UIContext";

export default function CouponForm() {
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [minimumOrder, setMinimumOrder] = useState("");
  const [useLeft, setUseLeft] = useState("");
  const [expireOn, setExpireOn] = useState("");
  const [active, setActive] = useState(false);
  const { setIsSheetOpen } = useUI();
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
      const response = await _post(`coupon/add-coupon`, couponObj);

      if (response.data.success) {
        setIsSheetOpen(false);
        setTitle("");
        setCode("");
        setType("");
        setValue("");
        setMinimumOrder("");
        setUseLeft("");
        setExpireOn("");
        setActive(false);
      }
    } catch (e) {
      console.log(e.messge);
    } finally {
      setIsLoading(false);
    }
  };
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
          onChange={(e) => setType(e.target.value)}
        >
          <option defaultValue="" disabled selected>
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
          type="text"
          name="value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Label htmlFor="minimumOrder" className="mt-3 mb-3">
          MinimumOrder
        </Label>
        <Input
          id="minimumOrder"
          type="text"
          name="minimumOrder"
          value={minimumOrder}
          onChange={(e) => setMinimumOrder(e.target.value)}
        />
        <Label htmlFor="useLeft" className="mt-3 mb-3">
          UseLeft
        </Label>
        <Input
          id="useLeft"
          type="text"
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
            onCheckedChange={(e) => setActive((prev) => !prev)}
          />
          <Label htmlFor="airplane-mode">
            {active ? "Active" : "Disabled"}
          </Label>
        </div>

        <Button type="submit w-full">
          {isLoading ? "Loading..." : "Add coupon"}
        </Button>
      </form>
    </>
  );
}
