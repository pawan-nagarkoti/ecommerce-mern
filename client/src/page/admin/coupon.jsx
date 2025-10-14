import { DataTable } from "../../components/customTable";
import { Button } from "@/components/ui/button";

export default function Coupon() {
  return (
    <>
      <div className="p-4">
        <div className="text-end">
          <Button>Add coupon</Button>
        </div>
      </div>
      <DataTable />
    </>
  );
}
