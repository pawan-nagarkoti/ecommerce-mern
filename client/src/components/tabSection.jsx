import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "../page/shop/Address";
import Order from "./order";
import ResetPassword from "./resetPassword";

export default function TabSection() {
  return (
    <>
      <Tabs defaultValue="order" className="w-full">
        <TabsList>
          <TabsTrigger value="order">Order</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="resetPassword">Forgot Password</TabsTrigger>
        </TabsList>
        <TabsContent value="order">
          <Order />
        </TabsContent>
        <TabsContent value="address">
          <Address />
        </TabsContent>
        <TabsContent value="resetPassword">
          <ResetPassword />
        </TabsContent>
      </Tabs>
    </>
  );
}
