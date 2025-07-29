import { Button } from "@/components/ui/button";

export default function ProductCard() {
  return (
    <div>
      <img
        src="https://picsum.photos/200"
        alt=""
        className="w-full h-[300px]"
      />
      <h4>Product one</h4>
      <div>$350</div>
      <div className="flex justify-between mt-3">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}
