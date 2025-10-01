import React from "react";
import AddressCard from "../../components/address-card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { _get, _post, _put } from "../../lib/api";
import useUI from "../../contexts/UIContext";
import { useEffect } from "react";

export default function Address() {
  const { setIsAddressAdd, isEditAddress, setIsEditAddress } = useUI();
  const [isAddress, setIsAddress] = useState("");
  const [isCity, setIsCity] = useState("");
  const [isPincode, setIsPincode] = useState("");
  const [isPhone, setIsPhone] = useState("");
  const [isNotes, setIsNotes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = isEditAddress
      ? await _put(`address/update/${isEditAddress}`, {
          address: isAddress,
          city: isCity,
          pincode: isPhone,
          phone: isPhone,
          notes: isNotes,
        })
      : await _post(`address/add`, {
          address: isAddress,
          city: isCity,
          pincode: isPincode,
          phone: isPhone,
          notes: isNotes,
        });

    if (response.status === 200) {
      isEditAddress ? alert("Address updated") : alert("Address Added");
      setIsAddress("");
      setIsCity("");
      setIsNotes("");
      setIsPhone("");
      setIsPincode("");
      setIsAddressAdd((prev) => !prev);
      setIsEditAddress("");
    }
  };

  useEffect(() => {
    if (isEditAddress) {
      (async () => {
        const res = await _get(`address/single/${isEditAddress}`);
        if (res.status === 200) {
          const v = res?.data?.data;
          setIsAddress(v.address);
          setIsCity(v.city);
          setIsNotes(v.notes);
          setIsPhone(v.phone);
          setIsPincode(v.pincode);
        }
      })();
    }
  }, [isEditAddress]);

  return (
    <>
      <AddressCard />
      <div className="mt-5 font-extrabold mb-5">Add New Address</div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="w-full border p-1.5 rounded mt-0.5"
          value={isAddress}
          onChange={(e) => setIsAddress(e.target.value)}
        />

        <label htmlFor="city">City</label>
        <input
          type="text"
          className="w-full border p-1.5 rounded mt-0.5"
          value={isCity}
          onChange={(e) => setIsCity(e.target.value)}
        />

        <label htmlFor="pincode">Pincode</label>
        <input
          type="text"
          className="w-full border p-1.5 rounded mt-0.5"
          value={isPincode}
          onChange={(e) => setIsPincode(e.target.value)}
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          className="w-full border p-1.5 rounded mt-0.5"
          value={isPhone}
          onChange={(e) => setIsPhone(e.target.value)}
        />

        <label htmlFor="notes">Notes</label>
        <input
          type="text"
          className="w-full border p-1.5 rounded mt-0.5"
          value={isNotes}
          onChange={(e) => setIsNotes(e.target.value)}
        />

        <Button className="mt-5">submit</Button>
      </form>
    </>
  );
}
