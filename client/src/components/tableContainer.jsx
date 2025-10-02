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

export default function TableContainer({ item }) {
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
            <TableCell className="text-center">{v.orderDate}</TableCell>
            <TableCell className="text-center">
              {orderStatusList.map((c, index) => (
                <>
                  {v.orderStatus === c.statusName && (
                    <span
                      key={index}
                      style={{
                        backgroundColor: c.colorName,
                        color: "#fff",
                        padding: ".3rem",
                        fontSize: "12px",
                        borderRadius: "5px",
                      }}
                    >
                      {v.orderStatus}
                    </span>
                  )}
                </>
              ))}
            </TableCell>
            <TableCell className="text-center">${v.totalAmount}</TableCell>
            <TableCell className="text-center">
              <Button>view detail</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
