import { Button } from "@/components/ui/button";
import { _delete } from "../lib/api";
import useUI from "../contexts/UIContext";

export default function ProductCard({ items }) {
  const {
    setCallProducts,
    setIsOpen,
    setHasEditProductBtnClicked,
    setIsProductId,
  } = useUI();
  // deleted product
  const handleDeleteProduct = async (id) => {
    try {
      const response = await _delete(`product/delete?id=${id}`);
      if (response?.data?.success) {
        alert("Product deleted");
        setCallProducts(true);
      } else {
        alert("something is wrong");
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div>
      <img src={items?.image} alt="" className="w-full h-[300px] mb-3" />
      <h4 className="font-bold">{items?.title}</h4>
      <p className="text-[14px]">{items?.description}</p>
      <div className="font-bold">
        Price <span className="text-[14px]"> ₹{Math.floor(items?.price)} </span>
      </div>
      <div className="flex justify-between mt-3">
        <Button
          onClick={() => {
            setIsOpen(true);
            setHasEditProductBtnClicked(true);
            setIsProductId(items?._id);
          }}
        >
          Edit
        </Button>
        <Button onClick={() => handleDeleteProduct(items._id)}>Delete</Button>
      </div>
    </div>
  );
}
