"use client";
import { poppins } from "@/app/font/fonts";
import { MenuIcon, SearchIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SmallNav() {
  const [clicked, setClicked] = useState(false);

  const handleMenuClick = () => {
    if (clicked) {
      setClicked(false);
    } else {
      setClicked(true);
    }
  };
  return (
    <nav className="lg:hidden w-10/12 h-full mx-auto flex justify-between items-center">
      <div>
        <Link href={"/"} className="text-white">
          <Image
            width={40}
            height={0}
            src={"/images/quickcart.png"}
            alt="Logo"
          />
        </Link>
      </div>
      <div>
        <MenuIcon className="text-white" onClick={() => handleMenuClick()} />
      </div>

      <div
        className={`${clicked ? "show-menu" : ""} hide-menu fixed flex flex-col gap-7 w-full h-screen bg-black/70 z-10`}
      >
        <div className="w-full h-16 bg-black">
          <div className="w-10/12 h-16 mx-auto flex items-center justify-between">
            <Link href={"/"} className={`${poppins.className} text-white`}>
              <Image
                height={0}
                width={40}
                alt="Logo"
                src={"/images/quickcart.png"}
                className="h-auto"
              />
            </Link>
            <X
              onClick={() => handleMenuClick()}
              className="text-white"
              size={28}
            />
          </div>
        </div>

        <div className="w-11/12 mx-auto">
          <form className="flex justify-center items-center w-full h-full">
            <input
              className="w-full border-b focus:outline-none text-white border-gray-500 font-bold text-md bg-transparent ps-3 pb-1 rounded-l-lg"
              placeholder="Search..."
            />
            <button className="text-md font-bold border-b border-gray-500 text-white px-3 pb-1 bg-transparent rounded-r-lg hover:bg-yellow-500 duration-500">
              <SearchIcon />
            </button>
          </form>
        </div>
        <div className="w-11/12 mx-auto border-b border-gray-400">
          <Link href={"/"} className={`${poppins.className} text-white`}>
            Home
          </Link>
        </div>
        <div className="w-11/12 mx-auto border-b border-gray-400">
          <Link href={"/cart"} className={`${poppins.className} text-white`}>
            Cart
          </Link>
        </div>
        <div className="w-11/12 mx-auto border-b border-gray-400">
          <Link href={"/orders"} className={`${poppins.className} text-white`}>
            Orders
          </Link>
        </div>
      </div>
    </nav>
  );
}
