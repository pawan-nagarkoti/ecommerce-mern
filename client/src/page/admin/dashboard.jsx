import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { _get } from "../../lib/api";
import axios from "axios";

export default function dashboard() {
  const fetchFeaturedImage = async () => {
    const response = await _get("feature/get");
    console.log("response", response);
  };
  useEffect(() => {
    fetchFeaturedImage();
  }, []);
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="picture">Upload Image</Label>
        <Input id="picture" type="file" />
        <Button>Upload</Button>
      </div>

      <div className="mt-10">
        <img
          src="https://picsum.photos/200"
          alt=""
          className="w-full h-[300px]"
        />
        <div className="flex gap-2 mt-2">
          <Button>Edit</Button>
          <Button className="bg-red-500 hover:bg-red-400">Delete</Button>
        </div>
      </div>
    </>
  );
}
