import { createClient } from "@/lib/supabase/server";
import { SearchIcon, ShoppingBag, TruckElectric } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { montserrat, poppins } from "@/app/font/fonts";
import Account from "./your-account";

export default async function Header() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  const role = await supabase.from("roles").select().eq("user_id", data?.user?.id).single()

  return (
    <header className="w-full h-16 bg-gray-800 mb-10 shadow-black/20 shadow-lg">
      <nav className="w-4/5 h-full mx-auto flex justify-between">
        <div className="w-3/12 h-full flex justify-start items-center gap-7">
          <Link href={"/"} className="text-white">
            <Image height={0} width={40} alt="Logo" src={"/images/quickcart.png"} className="h-auto" />
          </Link>
          <Link href={"/orders"} className="text-white flex items-center gap-0 hover:text-gray-400 duration-300">
            <TruckElectric className="" />
            <h1 className={`${poppins.className} text-lg`}>Orders</h1>
          </Link>
        </div>
        <div className="flex justify-center items-center h-full w-8/12">
          <form className="flex justify-center items-center w-full h-full">
            <input className="w-full border-gray-500 font-bold text-md bg-gray-200 ps-3 py-2 rounded-l-lg" placeholder="Search..." />
            <button className="text-md font-bold text-white px-3 py-2 bg-yellow-400 rounded-r-lg hover:bg-yellow-500 duration-500">
              <SearchIcon className="text-black" />
            </button>
          </form>
        </div>
        <div className="flex w-3/12 h-full items-center justify-end gap-5">
          <Link href={"/cart"} className="text-white">
            <ShoppingBag className="hover:text-gray-400 duration-300" />
          </Link>
          <div className="text-white text-end flex items-center gap-3">
            {
              error || !data?.user ?
                (
                  <div className="flex flex-col">
                    <h1 className="text-sm">Hello, </h1>
                    <Link href={"/auth/login"} className={`${montserrat.className} hover:text-gray-300 duration-300`}>Sign in</Link>
                  </div>
                ) : (
                  <div>
                    <Account role={role.data.role} email={data?.user?.email} />
                  </div>
                )
            }
          </div>
        </div>
      </nav>
    </header>
  )
}
