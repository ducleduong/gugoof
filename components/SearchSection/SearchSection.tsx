import { useRouter } from "next/router";
import Image from "next/image";
import React, { useState } from "react";
import { FaRemoveFormat, FaSearch } from "react-icons/fa";

function SearchSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  return (
    <main className={`flex min-h-screen flex-col items-center justify-start px-48 py-48`}>
      <div className="relative flex flex-col">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert mb-10"
          src="/logo_main.png"
          alt="Gugoof Logo"
          width={400}
          height={180}
          priority
        />
      </div>
      <div className="rounded-full text-xl flex items-center py-4 px-10 shadow-2xl bg-slate-50 w-2/3 mb-10">
        <FaSearch />
        <input
          type="text"
          className="bg-transparent w-full outline-none ms-5"
          placeholder="Search everything... from Google"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <FaRemoveFormat
            className="cursor-pointer"
            onClick={() => setSearchQuery("")}
          />
        )}
      </div>
      <button
        className="bg-gradient-to-bl from-slate-50 to-slate-100 font-bold py-4 px-10 rounded-lg shadow-lg transition duration-300 ease-in-out hover:scale-110"
        onClick={() => {
          if (searchQuery !== "") router.push(`?search=${searchQuery}`);
        }}
      >
        Search
      </button>
    </main>
  );
}

export default SearchSection;
