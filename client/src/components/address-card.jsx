import React from "react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { _delete, _get } from "../lib/api";
import { useState } from "react";
import useUI from "../contexts/UIContext";

export default function AddressCard() {
  const [hasAddress, setHasAddress] = useState([]);
  const { isAddressAdd, setIsEditAddress } = useUI();

  const fetchAddress = async () => {
    const response = await _get("/address/get");
    if (response.status === 200) {
      setHasAddress(response);
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
      {hasAddress?.data?.data?.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {hasAddress?.data?.data?.map((v, index) => (
            <div className="border-1 p-5 rounded-2xl" key={index}>
              <p>Address : {v.address}</p>
              <p>City : {v.city}</p>
              <p>Pincode: {v.pincode}</p>
              <p>Phone: {v.phone}</p>
              <p>Notes: {v.notes}</p>
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
