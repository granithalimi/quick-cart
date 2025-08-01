"use client";
import { fira, poppins } from "@/app/font/fonts";
import { createClient } from "@/lib/supabase/client";
import {
  MenuIcon,
  SearchIcon,
  ShoppingBag,
  TruckElectric,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoutButton } from "./logout-button";
import { search } from "@/lib/actions";

export default function SmallNav() {
  const [clicked, setClicked] = useState(false);
  const [user, setUser] = useState<string | null>();
  const [cartItems, setCartItems] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data?.user?.email);
        const cart = await supabase
          .from("carts")
          .select("cp:carts_products(product_id, qty)")
          .eq("user_id", data?.user?.id)
          .single();
        if (cart.data?.cp && cart.data?.cp.length > 0) {
          setCartItems(true);
        } else {
          setCartItems(false);
        }
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
      <div className="relative">
        <MenuIcon className="text-white" onClick={() => handleMenuClick()} />
        {cartItems && (
          <div className="p-[5px] rounded-full bg-red-400 absolute top-0 -right-1 border border-white"></div>
        )}
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
          <form action={search} className="flex justify-center items-center w-full h-full">
            <input
              name="search"
              className="w-full border-b focus:outline-none text-white border-gray-500 font-bold text-md bg-transparent ps-3 pb-1 rounded-l-lg"
              placeholder="Search..."
            />
            <button className="text-md font-bold border-b border-gray-500 text-white px-3 pb-1 bg-transparent rounded-r-lg hover:bg-yellow-500 duration-500">
              <SearchIcon />
            </button>
          </form>
        </div>
        <Link
          href={"/"}
          className={`${poppins.className} text-white w-11/12 mx-auto border-b border-gray-400`}
        >
          Home
        </Link>
        <Link
          href={"/cart"}
          className={`${poppins.className} text-white w-11/12 mx-auto border-b border-gray-400 relative flex items-center gap-1`}
        >
            {cartItems && (
              <div className="p-[4px] rounded-full bg-red-400 absolute -top-1 -left-1 border border-white"></div>
            )}
          <ShoppingBag size={22} />
          <h1>Cart</h1>
        </Link>
        <Link
          href={"/orders"}
          className={`${poppins.className} text-white w-11/12 mx-auto border-b border-gray-400 flex gap-1 items-center`}
        >
          <TruckElectric size={24} />
          <h1>Orders</h1>
        </Link>

        {/* Sign-in/Logout button */}
        <div className="w-11/12 mx-auto mb-3 border-t border-gray-500 p-2 rounded-lg text-gray-500">
          {user ? (
            <div className="flex justify-between items-center text-white">
              <h1 className={`${poppins.className}`}>Welcome, {user}</h1>
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
