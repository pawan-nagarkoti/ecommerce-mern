import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductList() {
  return (
    <>
      <Card className="p-2 gap-2">
        <CardHeader className="p-0 gap-0">
          <img
            src="https://picsum.photos/200"
            alt=""
            className="w-full h-[200px]"
          />
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent className="px-3">
          <p>Review Check</p>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">Men</p>
            <p className="text-gray-500 text-sm">Puma</p>
          </div>
          <p className="mt-4">$1000</p>
        </CardContent>
        <CardFooter className=" p-0">
          <Button className="w-full">Add to cart</Button>
        </CardFooter>
      </Card>
    </>
  );
}
