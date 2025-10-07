import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { _delete, _get } from "../lib/api";
import { useState } from "react";
import useUI from "../contexts/UIContext";
import LoadingSpinner from "./loding";

export default function AddressCard({ howManyAddressShow }) {
  const [hasAddress, setHasAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isAddressAdd,
    setIsEditAddress,
    isSelectedAddress,
    setIsSelectedAddress,
  } = useUI();

  const fetchAddress = async () => {
    setIsLoading(true);
    try {
      const response = await _get("/address/get");
      if (response.status === 200) {
        setHasAddress(response);
      }
    } catch (e) {
      console.log(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, [isAddressAdd]);

  const handleDelete = async (id) => {
    const response = await _delete(`/address/delete/${id}`);
    if (response.status === 200) {
      alert("Address deleted");
      fetchAddress();
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : hasAddress?.data?.data?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {hasAddress?.data?.data
            ?.slice(0, howManyAddressShow)
            ?.map((v, index) => (
              <div
                className="border-1 p-5 rounded-2xl cursor-pointer"
                style={{
                  background:
                    isSelectedAddress._id === v._id ? "#E3FCEC" : "white",
                }}
                key={index}
                onClick={() => setIsSelectedAddress(v)}
              >
                <p>Address : {v.address}</p>
                <p>City : {v.city}</p>
                <p>Pincode: {v.pincode}</p>
                <p>Phone: {v.phone}</p>
                <p>Notes: {v.notes.slice(0, 60)}...</p>
                <div className="flex justify-between mt-4">
                  <Button onClick={() => setIsEditAddress(v._id)}>edit</Button>
                  <Button onClick={() => handleDelete(v._id)}>delete</Button>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p>No address found</p>
      )}
    </>
  );
}
