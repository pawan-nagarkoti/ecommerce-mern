import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Address from "../page/shop/Address";

export default function TabSection() {
  return (
    <>
      <Tabs defaultValue="order" className="w-full">
        <TabsList>
          <TabsTrigger value="order">Order</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
        </TabsList>
        <TabsContent value="order">
          <p>order</p>
        </TabsContent>
        <TabsContent value="address">
          <Address />
        </TabsContent>
      </Tabs>
    </>
  );
}
