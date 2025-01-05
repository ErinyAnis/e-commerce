"use client";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { ProductData, StoreState } from "../../type";
import CartItem from "./CartItem";
import { resetCart } from "@/redux/shoppersSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const CartContainer = () => {
  const { cart } = useSelector((state: StoreState) => state?.shoppers); //to grap the data from our store
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResetCart = () => {
    dispatch(resetCart());
    toast.success("Cart reset successfully");
    setIsModalOpen(false);
  };

  return (
    <div>
      {cart?.length > 0 ? (
        <div>
          <div className="pb-20">
            <div className="w-full h-20 bg-[#f5f5f5] text-accent hidden lg:grid grid-cols-5 place-content-center px-6 text-lg font-semibold">
              <h2 className="col-span-2">Product</h2>
              <h2>Price</h2>
              <h2>Quantity</h2>
              <h2>Sub Total</h2>
            </div>
            <div className="mt-5">
              {cart?.map((item: ProductData) => (
                <CartItem key={item?._id} cart={cart} item={item} />
              ))}
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="py-2 px-10 bg-lightRed text-white font-semibold uppercase mt-1 mb-4 hover:bg-red-600 hoverEffect rounded-sm"
            >
              Reset cart
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-lg font-semibold mb-4">
                  Are you sure you want to reset your cart?
                </h2>
                <div className="flex justify-end space-x-4">
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 hoverEffect hover:text-white"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 hoverEffect"
                    onClick={handleResetCart}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <motion.div>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={"/empty-cart.png"}
              alt="empty cart"
              width={280}
              height={280}
              className="h-28 w-28 lg:h-52 lg:w-52 object-contain"
            />
            <h1 className="text-lg lg:text-xl font-bold uppercase">Your cart is empty</h1>
            <p className="text-sm lg:text-base text-center px-10 -mt-2 text-lightText">
              Explore our collection and find something you love to fill your
              cart!
            </p>
            <Link
              href={"/shop"}
              className="bg-lightOrange text-white hover:bg-darkOrange hoverEffect text-sm lg:text-base px-5 lg:px-7 py-2.5 mt-3 rounded-lg font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CartContainer;
