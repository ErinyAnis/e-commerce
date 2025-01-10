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
      className="bg-accentWhite w-[58px] lg:w-16 h-[62px] lg:h-[70px] rounded-md flex flex-col gap-1 text-accent justify-center items-center shadow-sm shadow-green-600 group overflow-hidden relative"
    >
      <div className="flex items-center justify-center">
        <RiShoppingCart2Fill className="text-xl lg:text-2xl -translate-x-10 group-hover:translate-x-2 lg:group-hover:translate-x-3 tranition-transform duration-200" />
        <RiShoppingCart2Fill className="text-xl lg:text-2xl -translate-x-3 group-hover:translate-x-12 tranition-transform duration-200" />
      </div>
      <p className="text-[11px] lg:text-xs font-semibold">Buy Now</p>
      <p className="absolute top-1.5 right-3.5 lg:right-3 bg-darkOrange text-white text-[11px] lg:text-xs w-3.5 h-3.5 lg:w-4 lg:h-4 rounded-full flex items-center justify-center font-semibold">
        {cart? cart?.length : 0}
      </p>
    </Link>
  );
};

export default SidebarCart;
