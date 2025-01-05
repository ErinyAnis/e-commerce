import Link from "next/link";
import { MdSwitchAccount } from "react-icons/md";
import SidebarCart from "./SidebarCart";

const Sidebar = () => {
  return (
    <div className="fixed top-60 right-2 z-20 flex flex-col gap-2">
      {/* User Account */}
      <Link
        href={"/signin"}
        className="bg-accentWhite w-16 h-[70px] rounded-md flex flex-col gap-1 text-accent justify-center items-center shadow-sm shadow-green-600 group overflow-hidden"
      >
        <div className="flex items-center justify-center">
          <MdSwitchAccount className="text-2xl -translate-x-10 group-hover:translate-x-3 tranition-transform duration-200" />
          <MdSwitchAccount className="text-2xl -translate-x-3 group-hover:translate-x-12 tranition-transform duration-200" />
        </div>
        <p className="text-xs font-semibold">Profile</p>
      </Link>
      {/* Cart */}
      <SidebarCart />
    </div>
  );
};

export default Sidebar;
