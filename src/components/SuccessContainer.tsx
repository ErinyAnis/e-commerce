"use client";

import { resetCart } from "@/redux/shoppersSlice";
import { StoreState } from "@/type";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import Loader from "./Loader";
import {
  HiCheckCircle,
  HiHome,
  HiInformationCircle,
  HiMail,
} from "react-icons/hi";
import Link from "next/link";
import toast from "react-hot-toast";

const SuccessContainer = ({ id }: { id: string }) => {
  const { cart } = useSelector((state: StoreState) => state?.shoppers);
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [totalAmt, setTotalAmt] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let price = 0;
    cart.map((item) => {
      price += item?.price * item?.quantity;
      return price;
    });
    setTotalAmt(price);
  }, [cart]);

  const handleSaveOrder = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/saveorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cart,
          email: session?.user?.email as string,
          id: id,
          totalAmt,
        }),
      });
      const data = await response.json();

      if (data?.success) {
        setLoading(false);
        dispatch(resetCart());
        toast.success(data?.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [cart, session?.user?.email, id, totalAmt, dispatch]);

  useEffect(() => {
    if (session?.user && cart?.length) {
      handleSaveOrder();
    }
  }, [session?.user, cart?.length, handleSaveOrder]);

  return (
    <div>
      {loading ? (
        <Loader title="Payment is processing... Please do not press back buttton" />
      ) : (
        <div className="bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-28">
          <div className="max-w-md w-full text-center space-y-6 lg:space-y-7">
            <div className="relative mb-7">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-green-100 rounded-full"></div>
              </div>
              <div className="relative">
                <HiCheckCircle className="mx-auto h-14 lg:h-24 w-14 lg:w-24 text-green-500" />
              </div>
            </div>
            <h2 className="mt-12 text-xl lg:text-3xl font-extrabold text-gray-900">
              Success!
            </h2>
            <p className="text-sm lg:text-base text-gray-500">
              Your payment has been completed successfuly.
            </p>
            <div className="mt-8 space-y-6">
              <p className="text-sm lg:text-base">
                Thank you for your submission. We&apos;ve received your
                information and will process it shortly. You should receive a
                confirmation email within the next few minutes.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href={"/"}>
                  <button className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-sm shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <HiHome className="mr-2 h-5 w-5" />
                    Home
                  </button>
                </Link>
                <Link href={"/orders"}>
                  <button className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-sm shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <HiInformationCircle className="mr-2 h-5 w-5" />
                    Orders
                  </button>
                </Link>
                <Link href={"/"}>
                  <button className="inline-flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-sm shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1">
                    <HiMail className="mr-2 h-5 w-5" />
                    Contact
                  </button>
                </Link>
              </div>
            </div>
            <div className="!mt-9 !lg:mt-12 flex justify-center space-x-3 lg:space-x-4">
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-200 rounded-full"></div>
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-300 rounded-full"></div>
              <div className="w-2 h-2 lg:w-3 lg:h-3 bg-green-400 rounded-full"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessContainer;
