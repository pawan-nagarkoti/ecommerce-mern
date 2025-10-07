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
import { _post } from "../lib/api";
import useUI from "../contexts/UIContext";

export default function ProductList({ item = {} }) {
  const userID = JSON.parse(localStorage.getItem("loginUser")).id;
  const { setNotifyToTheCart, setIsDiloagModalOpen, setIsProductId } = useUI();

  const handleAddToCart = async (price, productID) => {
    try {
      const response = await _post("cart/add", {
        userID: userID,
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
      <Card
        className="p-2 gap-2"
        onClick={() => {
          setIsDiloagModalOpen(true);
          setIsProductId(item._id);
        }}
      >
        <CardHeader className="p-0 gap-0">
          <img src={item.image} alt="" className="w-full h-[200px]" />
          <CardTitle></CardTitle>
          <CardDescription></CardDescription>
          <CardAction></CardAction>
        </CardHeader>
        <CardContent className="px-3">
          <p className="font-semibold">{item.title}</p>
          <p className="text-justify h-[100px]">
            {item.description.slice(0, 100)}..
          </p>
          <div className="flex justify-between items-center">
            <p className="text-gray-500 text-sm">{item.category}</p>
            <p className="text-gray-500 text-sm">{item.brand}</p>
          </div>
          <p className="mt-3 font-bold">
            {" "}
            Price
            <span className="font-medium"> ₹{Math.floor(item.price)}</span>
          </p>
        </CardContent>
        <CardFooter className=" p-0">
          <Button
            type="button"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation(), handleAddToCart(item.price, item._id);
            }}
          >
            Add to cart
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
