import { Button } from "@/components/ui/button";
import { SheetContainer } from "../../components/SheetContainer";
import useUI from "../../contexts/UIContext";
import CouponForm from "../../components/couponForm";
import CouponTable from "../../components/couponTable";

export default function Coupon() {
  const { setIsSheetOpen } = useUI();
  return (
    <>
      <div className="p-4">
        <div className="text-end">
          <Button onClick={() => setIsSheetOpen(true)}>Add coupon</Button>
          <SheetContainer>
            <CouponForm />
          </SheetContainer>
        </div>
      </div>
      <CouponTable />
    </>
  );
}
