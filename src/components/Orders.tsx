"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { collection, deleteDoc, doc, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { ProductData } from "@/type";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from "./ui";
import FormattedPrice from "./FormattedPrice";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

interface Order {
  id: string;
  value: {
    amount: number;
    items: ProductData[];
  };
}

const Orders = () => {
  const { data: session } = useSession(); //Destructures the data object returned by useSession and renames it as session.
  //session contains information about the currently authenticated user (e.g., name, email).

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleDetails = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const [ordersSnapshot, loading] = useCollection(
    // (useCollection): It fetches and monitors real-time updates from the Firestore database.
    session &&
      query(collection(db, "users", session?.user?.email as string, "orders"))
  );
  // It returns two values:
  // ordersSnapshot: Contains the data retrieved from the specified Firestore collection.
  // loading: A boolean indicating whether the data is still being loaded.

  //query: Used to create a query for Firestore. Queries allow you to fetch specific subsets of data from a collection.

  //Result: The query targets a specific user's orders in the Firestore database
  const orders = ordersSnapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Order[];

  const handleDeleteOrder = async (id: string) => {
    try {
      await deleteDoc(
        doc(db, "users", session?.user?.email as string, "orders", id)
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error?.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      toast.success("Order deleted successfully.");
    }
  };

  return (
    <div className="flex flex-col gap-y-5 mt-5">
      {loading ? (
        <div className="flex flex-col flex-1 space-y-6 overflow-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="w-full py-20 rounded-md shrink-0 animate-pulse bg-zinc-400"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {orders?.length ? (
            orders?.map((item) => (
              <div key={item.id}>
                <Card
                  className={
                    expandedOrderId === item.id ? "border-darkOrange/30" : ""
                  }
                >
                  <CardHeader>
                    <CardTitle>
                      Order ID:
                      <span className="text-sm lg:text-base tracking-wide text-lightText ml-2">
                        {item?.id.slice(-10)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-black/60">
                          Total Amount
                        </p>
                        <FormattedPrice
                          amount={item?.value?.amount}
                          className="text-base lg:text-lg font-semibold"
                        />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-black/60">
                          Payment Status
                        </p>
                        <Badge variant="success">Paid</Badge>
                      </div>
                      <Button
                        onClick={() => toggleDetails(item.id)}
                        className="bg-gray-600 hover:bg-gray-800 text-white"
                      >
                        {expandedOrderId === item.id
                          ? "Hide Details"
                          : "Show Details"}
                      </Button>
                      <Button
                        className="flex items-center gap-1 lg:gap-1.5 justify-center text-white bg-red-600 hover:bg-red-700"
                        onClick={() => handleDeleteOrder(item?.id)}
                      >
                        <MdClose className="text-base" />
                        Delete order
                      </Button>
                    </div>
                  </CardContent>
                  <AnimatePresence>
                    {expandedOrderId === item?.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Card className="border-0 border-t rounded-none px-0 py-3 mt-3">
                          <CardHeader>
                            <CardTitle>Order Items</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <Table>
                              <TableHeader>
                                <TableRow isHeader>
                                  <TableHead>Item</TableHead>
                                  <TableHead className="text-center">
                                    Price
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Quantity
                                  </TableHead>
                                  <TableHead className="text-center">
                                    Subtotal
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {item?.value?.items?.map(
                                  (product: ProductData) => (
                                    <TableRow key={product?._id}>
                                      <TableCell>{product?.title}</TableCell>
                                      <TableCell className="text-center">
                                        <FormattedPrice
                                          amount={product?.price}
                                        />
                                      </TableCell>
                                      <TableCell className="text-center">
                                        {product?.quantity}
                                      </TableCell>
                                      <TableCell className="text-center font-semibold">
                                        <FormattedPrice
                                          amount={
                                            product?.price * product?.quantity
                                          }
                                        />
                                      </TableCell>
                                    </TableRow>
                                  )
                                )}
                              </TableBody>
                            </Table>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            ))
          ) : (
            <div>
              <p className="text-lg font-medium -mt-3">
                Your order data is empty
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;
