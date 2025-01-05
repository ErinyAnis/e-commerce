"use client"

import Link from "next/link";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { StoreState } from "../../type";

const SidebarCart = () => {
  const {cart} = useSelector((state: StoreState) => state?.shoppers); //to grap the data from our store

  return (
    <Link
      href={"/cart"}
      className="bg-accentWhite w-16 h-[70px] rounded-md flex flex-col gap-1 text-accent justify-center items-center shadow-sm shadow-green-600 group overflow-hidden relative"
    >
      <div className="flex items-center justify-center">
        <RiShoppingCart2Fill className="text-2xl -translate-x-10 group-hover:translate-x-3 tranition-transform duration-200" />
        <RiShoppingCart2Fill className="text-2xl -translate-x-3 group-hover:translate-x-12 tranition-transform duration-200" />
      </div>
      <p className="text-xs font-semibold">Buy Now</p>
      <p className="absolute top-1 right-3 bg-darkOrange text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-semibold">
        {cart? cart?.length : 0}
      </p>
    </Link>
  );
};

export default SidebarCart;
