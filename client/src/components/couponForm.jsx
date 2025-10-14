import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function CouponForm() {
  return (
    <>
      <form action="">
        <Label htmlFor="title" className="mb-3">
          Title
        </Label>
        <Input id="title" type="text" name="title" />
        <Label htmlFor="code" className="mt-3 mb-3">
          Code
        </Label>
        <Input id="code" type="text" name="code" />

        <Label htmlFor="code" className="mt-3 mb-3">
          Type
        </Label>
        <select class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
          <option value="" disabled selected>
            Select type
          </option>
          <option value="percent">Percent</option>
          <option value="fixed">Fixed</option>
        </select>

        <Label htmlFor="value" className="mt-3 mb-3">
          Value
        </Label>
        <Input id="value" type="text" name="value" />
        <Label htmlFor="minimumOrder" className="mt-3 mb-3">
          MinimumOrder
        </Label>
        <Input id="minimumOrder" type="text" name="minimumOrder" />
        <Label htmlFor="useLeft" className="mt-3 mb-3">
          UseLeft
        </Label>
        <Input id="useLeft" type="text" name="useLeft" />
        <Label htmlFor="expireOn" className="mt-3 mb-3">
          Expire On
        </Label>
        <Input id="expireOn" type="date" name="expireOn" />

        <div className="flex items-center space-x-2 mt-3">
          <Switch id="airplane-mode" />
          <Label htmlFor="airplane-mode">{true ? "Active" : "Disabled"}</Label>
        </div>
      </form>
    </>
  );
}
