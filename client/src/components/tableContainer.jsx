import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { orderStatusList } from "../lib/constant";
import DialogContainer from "./dilog-container";
import useUI from "../contexts/UIContext";
import React, { useState } from "react";
import OrderModal from "./order-modal";
import { formatDate } from "../lib/utils";

export default function TableContainer({ item = [] }) {
  const { isDiloagModalOpen, setIsDiloagModalOpen } = useUI();
  const [orderId, setOrderId] = useState("");
  return (
    <Table>
      <TableCaption></TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center font-bold">Order ID</TableHead>
          <TableHead className="text-center font-bold">Order Date</TableHead>
          <TableHead className="text-center font-bold">Order Status</TableHead>
          <TableHead className="text-center font-bold">Order Price</TableHead>
          <TableHead className="text-center font-bold"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {item.map((v, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">{v._id}</TableCell>
            <TableCell className="text-center">
              {formatDate(v.orderDate)}
            </TableCell>
            <TableCell className="text-center">
              {orderStatusList.map((c, index) => (
                <React.Fragment key={index}>
                  {v.orderStatus === c.statusName && (
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        borderRadius: "9999px",
                        backgroundColor: c.colorName,
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.75rem",
                        lineHeight: "1rem",
                        fontWeight: 500,
                        color: "#fff",
                        boxShadow: "inset 0 0 0 1px rgba(5,150,105,0.20)",
                      }}
                    >
                      {v.orderStatus}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </TableCell>
            <TableCell className="text-center">
              {" "}
              ₹ {Math.floor(v.totalAmount)}
            </TableCell>
            <TableCell className="text-center">
              <Button
                onClick={() => {
                  setIsDiloagModalOpen(true), setOrderId(v._id);
                }}
              >
                view detail
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {orderId && (
          <DialogContainer title="Order Summary">
            <OrderModal orderId={orderId} />
          </DialogContainer>
        )}
      </TableBody>
    </Table>
  );
}
