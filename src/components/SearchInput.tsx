"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full md:inline-flex flex-1 h-12 relative">
      <CiSearch className="text-lg absolute left-2.5 mt-4 text-lightOrange" />
      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 w-full h-full outline-none bg-transparent placeholder:text-lightText border-[1px]
          border-accent/30 rounded-sm pl-8 pr-28"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      {search && (
        <IoMdClose
          onClick={() => setSearch("")}
          className="text-accent/50 hover:text-lightRed hoverEffect cursor-pointer absolute right-[90px] top-4"
        />
      )}
      <button
        className="bg-lightOrange text-accentWhite absolute right-0 px-3.5 py-1.5 mr-2
          text-sm hover:bg-darkOrange hoverEffect font-medium top-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
