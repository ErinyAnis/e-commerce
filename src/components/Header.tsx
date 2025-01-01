"use client";

import { useState, useEffect } from "react";
import { navBarList } from "@/constants";
import Container from "./Container";
import Logo from "./Logo";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { HiMenuAlt2 } from "react-icons/hi";

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`w-full h-20 bg-accentWhite border-b-[1px] border-b-lightText/50 transition-all duration-600 ease-in-out ${isFixed ? "fixed top-0 z-50 shadow-lg bg-white translate-y-0" : "static translate-y-0"}`}
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
          <Link href={"/signin"} className="navBarItem">
            Sign in
          </Link>
          <Link href={"/studio"} className="navBarItem">
            Studio
          </Link>
        </div>
        <HiMenuAlt2 className="inline-flex md:hidden cursor-pointer text-2xl hover:text-darkOrange hoverEffect" />
      </Container>
    </header>
  );
};

export default Header;
