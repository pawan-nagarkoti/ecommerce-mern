import { Button } from "@/components/ui/button";

export default function ProductCard({ items }) {
  return (
    <div>
      <img src={items?.image} alt="" className="w-full h-[300px] mb-3" />
      <h4 className="font-bold">{items?.title}</h4>
      <p className="text-[14px]">{items?.description}</p>
      <div>${items?.price}</div>
      <div className="flex justify-between mt-3">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}
