"use client";

import { useState, useEffect } from "react";
import { navBarList } from "@/constants";
import Container from "./Container";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { HiMenuAlt2 } from "react-icons/hi";

import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const [shadow, setShadow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Track menu open state

  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setShadow(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 w-full h-20 bg-accentWhite border-b-[1px] border-b-lightText/50 transition-all duration-600 ease-in-out z-50 ${shadow ? "shadow-lg" : "static"}`}
    >
      <Container className="h-full flex items-center justify-between gap-5 lg:gap-10">
        <Logo />
        <SearchInput />
        <div className="hidden md:inline-flex items-center gap-4 lg:gap-7">
          {navBarList?.map((item) => (
            <Link key={item?.title} href={item?.link} className="navBarItem">
              {item?.title}
            </Link>
          ))}

          <Link href={"/orders"} className="navBarItem">
            Orders
          </Link>

          {/* Show the admin link only if the user is an admin */}
          {session?.user.isAdmin && (
            <Link href={"/studio"} className="navBarItem">
              Studio
            </Link>
          )}

          {session?.user ? (
            <button onClick={() => signOut()} className="navBarItem">
              Logout
            </button>
          ) : (
            <Link href={"/signin"} className="navBarItem">
              Sign in
            </Link>
          )}
        </div>

        {/* Menu Icon */}
        <HiMenuAlt2
          className="inline-flex md:hidden cursor-pointer text-2xl hover:text-darkOrange hoverEffect"
          onClick={() => setMenuOpen(!menuOpen)} // Toggle the menu open state
        />
      </Container>
      {/* Mobile Menu (Conditional) */}
      <div
        className={`md:hidden text-sm mt-0.5 py-12 px-8 h-screen w-[75%] flex flex-col items-center gap-10 transition-all duration-300 ease-in-out bg-white shadow-md ${
          menuOpen ? "translate-x-0" : "-translate-x-[100%]"
        }`}
      >
        {navBarList?.map((item) => (
          <Link
            key={item?.title}
            href={item?.link}
            className="navBarItem text-lg"
          >
            {item?.title}
          </Link>
        ))}

        <Link href={"/orders"} className="navBarItem text-lg">
          Orders
        </Link>
        <Link href={"/studio"} className="navBarItem text-lg">
          Studio
        </Link>
        <Link href={"/signin"} className="navBarItem text-lg">
          Sign in
        </Link>
      </div>
    </header>
  );
};

export default Header;
