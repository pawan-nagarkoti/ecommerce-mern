import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { _delete, _get } from "../../lib/api";
import axios from "axios";

export default function dashboard() {
  const [data, setData] = useState([]);

  const fetchFeaturedImage = async () => {
    try {
      const response = await _get("feature/get");
      setData(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    fetchFeaturedImage();
  }, []);

  // delete featured image
  const handleDeleteFeatureImage = async (id) => {
    const response = await _delete(`feature/delete?id=${id}`);
    if (response.data.success) {
      fetchFeaturedImage();
      alert("feature image deleted");
    }
  };
  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="picture">Upload Image</Label>
        <Input id="picture" type="file" />
        <Button>Upload</Button>
      </div>

      {data?.data?.length > 0 ? (
        data?.data?.map((v, i) => (
          <div className="mt-10" key={i}>
            <img src={v.image} alt="" className="w-full h-[300px]" />
            <div className="flex gap-2 mt-2">
              <Button>Edit</Button>
              <Button
                className="bg-red-500 hover:bg-red-400"
                onClick={() => handleDeleteFeatureImage(v._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center mt-10">Data not found</p>
      )}
    </>
  );
}
