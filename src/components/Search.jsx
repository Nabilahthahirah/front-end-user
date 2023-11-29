"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearchTerm("");
    router.push(`/${searchTerm}`);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center justify-between max-auto"
    >
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        value={searchTerm}
        id="search-navbar"
        className="block w-full p-2 pl-10 pr-20 py-3 text-sm rounded-md border border-primary focus:outline-none focus:border-secondary"
        placeholder="Search..."
      />
      <button className=" hover:bg-primary  rounded-md border border-primary p-[6px] mr-4 ml-2">
        <CiSearch />
      </button>
    </form>
  );
}
