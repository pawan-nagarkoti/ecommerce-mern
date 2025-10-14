import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { _delete, _get, _post, _put } from "../../lib/api";
import { Loader } from "lucide-react";

export default function Feature() {
  const [data, setData] = useState([]); // stored fetch featured image
  const [uploadImage, setUploadImage] = useState(""); // stored feature image
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef(null);
  const [editFeatureImageData, setEditFeatureImageData] = useState("");
  const [isPreviewImage, setIsPreviewImage] = useState("");
  const [isFetchingImg, setIsFetchingImg] = useState(false);

  // fetch all featured image
  const fetchFeaturedImage = async () => {
    try {
      setIsFetchingImg(true);
      const response = await _get("feature/get");
      setData(response.data);
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsFetchingImg(false);
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

  // add/update new featured image
  const hanldeUploadFeaturedImage = async () => {
    const v = new FormData();
    v.append(
      "image",
      uploadImage ? uploadImage : editFeatureImageData?.data?.image
    );

    try {
      setIsLoading(true);
      const response = editFeatureImageData?.data?._id
        ? await _put(
            `feature/update?id=${editFeatureImageData?.data?._id}`,
            v,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
        : await _post("feature/add", v, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      if (response.status === 200) {
        fetchFeaturedImage();
        setEditFeatureImageData("");
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
      imageRef.current.value = null; // removed selected image
      setUploadImage("");
      setIsPreviewImage("");
    }
  };

  // edit feature image
  const handleEditFeatureImage = async (id) => {
    try {
      const response = await _get(`feature/single?id=${id}`);
      if (response.status === 200) {
        setEditFeatureImageData(response?.data);
        setIsPreviewImage(response?.data?.data?.image);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    if (uploadImage) {
      setIsPreviewImage(URL.createObjectURL(uploadImage));
    }
  }, [uploadImage]);

  return (
    <>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="picture">Upload Image</Label>
        <Input
          id="picture"
          type="file"
          ref={imageRef}
          onChange={(e) => setUploadImage(e.target.files[0])}
        />
        {/* preview image */}
        {isPreviewImage && (
          <img src={isPreviewImage} alt="" className="h-[200px] w-full" />
        )}

        <Button onClick={hanldeUploadFeaturedImage} disabled={isLoading}>
          {isLoading ? <Loader /> : "Upload"}
        </Button>
      </div>

      {isFetchingImg ? (
        <div className="text-center mt-10 flex justify-center">
          <Loader />
        </div>
      ) : data?.data?.length > 0 ? (
        data?.data?.map((v, i) => (
          <div className="mt-10" key={i}>
            <img src={v.image} alt="" className="w-full h-[300px]" />
            <div className="flex gap-2 mt-2">
              <Button onClick={() => handleEditFeatureImage(v._id)}>
                Edit
              </Button>
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
