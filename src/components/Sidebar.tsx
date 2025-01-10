import Link from "next/link";
import { MdSwitchAccount } from "react-icons/md";
import SidebarCart from "./SidebarCart";
import { auth } from "@/auth";
import Image from "next/image";

const Sidebar = async () => {
  const session = await auth();

  return (
    <div className="fixed top-60 right-2 z-20 flex flex-col gap-2">
      {/* User Account */}
      <Link
        href={session?.user ? "/dashboard" : "/signin"}
        className="bg-accentWhite w-[58px] lg:w-16 h-[62px] lg:h-[70px] rounded-md flex flex-col gap-1 text-accent justify-center items-center shadow-sm shadow-green-600 group overflow-hidden"
      >
        <div className="flex items-center justify-center">
          {session?.user ? (
            <Image
              src={session?.user?.image as string}
              alt="user image"
              width={60}
              height={60}
              className="max-h-7 lg:max-h-8 lg:max-w-8 object-contain rounded-full -translate-x-10 group-hover:translate-x-3.5 tranition-transform duration-200"
            />
          ) : (
            <MdSwitchAccount className="text-xl lg:text-2xl -translate-x-10 group-hover:translate-x-2 lg:group-hover:translate-x-3 tranition-transform duration-200" />
          )}
          {session?.user ? (
            <Image
              src={session?.user?.image as string}
              alt="user image"
              width={60}
              height={60}
              className="max-h-7 lg:max-h-8 lg:max-w-8 object-contain rounded-full -translate-x-[14px] lg:-translate-x-4 group-hover:translate-x-12 tranition-transform duration-200"
            />
          ) : (
            <MdSwitchAccount className="text-xl lg:text-2xl -translate-x-2.5 lg:-translate-x-3 group-hover:translate-x-12 tranition-transform duration-200" />
          )}
        </div>
        <p className="text-xs font-semibold text-[11px]">Profile</p>
      </Link>
      {/* Cart */}
      <SidebarCart />
    </div>
  );
};

export default Sidebar;
