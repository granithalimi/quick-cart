"use client";
import { fira, poppins } from "@/app/font/fonts";
import { createClient } from "@/lib/supabase/client";
import { MenuIcon, SearchIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "./logout-button";

export default function SmallNav() {
  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState<string | null>();

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data?.user?.email);
      }
    };

    getUser();
  }, []);

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

        {/* Sign-in/Logout button */}
        <div className="w-11/12 mx-auto mb-3 border-t border-gray-500 p-2 rounded-lg text-gray-500">
          {user ? (
            <div className="flex justify-between items-center text-white">
              <h1 className={`${poppins.className}`}>
                Welcome, {user}
              </h1>
              <LogoutButton />
            </div>
          ) : (
            <h1 className={`${fira.className} text-xl text-white`}>
              Don&apos;t have an account?{" "}
              <Link href={"/auth/login"} className="underline">
                SignIn
              </Link>
            </h1>
          )}
        </div>
      </div>
    </nav>
  );
}
