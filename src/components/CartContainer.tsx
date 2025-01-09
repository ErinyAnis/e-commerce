"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ProductData, StoreState } from "../../type";
import CartItem from "./CartItem";
import { resetCart } from "@/redux/shoppersSlice";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import FormattedPrice from "./FormattedPrice";
import Button from "./Button";

interface User {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface Props {
  session: {
    user?: User;
    expires?: string;
  } | null;
}

const CartContainer = ({ session }: Props) => {
  const { cart } = useSelector((state: StoreState) => state?.shoppers); //to grap the data from our store
  const [ totalAmt, setTotalAmt]=useState(0)
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleResetCart = () => {
    dispatch(resetCart());
    toast.success("Cart reset successfully");
    setIsModalOpen(false);
  };

  useEffect(() => {
      let price = 0;
      cart.map((item) => {
        price += item?.price * item?.quantity;
        return price;
      });
      setTotalAmt(price);
    }, [cart]);

  const handleCheckout = async () => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cart,
        email: session?.user?.email,
      }),
    });
    const { url } = await response.json();
    if (url) {
      window.location.href = url;
    }
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
            <div className="max-w-7xl flex justify-end">
              <div className="w-96 flex flex-col gap-4">
                <div>
                  <h1 className="text-2xl font-semibold mb-2">Cart totals:</h1>
                  <div>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 px-4 text-lg font-medium">
                      Subtotal <FormattedPrice amount={totalAmt} />
                    </p>
                    <p className="flex items-center justify-between border-x-[1px] border-gray-400 py-1.5 px-4 text-lg font-medium">
                      Shipping Charge <FormattedPrice amount={15} />
                    </p>
                    <p className="flex items-center justify-between border-[1px] border-gray-400 py-1.5 px-4 text-lg font-medium">
                      Total <FormattedPrice amount={totalAmt + 15} />
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleCheckout}
                  disabled={!session?.user}
                  className="py-3 px-8 rounded-sm disabled:bg-darkOrange/40"
                >
                  Proceed to checkout
                </Button>
                {!session?.user && (
                  <p className="text-center text-sm font-medium text-lightRed -mt-2.5">
                    Please sign in to make Checkout
                  </p>
                )}
              </div>
            </div>
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
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-3 py-20"
        >
          <Image
            src={"/empty-cart.png"}
            alt="empty cart"
            width={280}
            height={280}
            className="h-28 w-28 lg:h-52 lg:w-52 object-contain"
          />
          <h1 className="text-lg lg:text-xl font-bold uppercase">
            Your cart is empty
          </h1>
          <p className="text-sm lg:text-base text-center px-10 -mt-2 text-lightText">
            Explore our collection and find something you love to fill your
            cart!
          </p>
          <Link
            href={"/"}
            className="bg-lightOrange text-white hover:bg-darkOrange hoverEffect text-sm lg:text-base px-5 lg:px-7 py-2.5 mt-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default CartContainer;
