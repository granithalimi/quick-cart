/* eslint-disable @typescript-eslint/no-explicit-any */

import Header from "@/components/header";
import Image from "next/image";
import { fira, montserrat, poppins } from "../font/fonts";
import { createClient } from "@/lib/supabase/server";
import { Trash2, TruckElectric } from "lucide-react";
import { decreaseQty, increaseQty, removeFromCart } from "@/lib/actions";
import Link from "next/link";

export default async function Page() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const cart = await supabase
    .from("carts")
    .select(
      "carts_products(id, qty, product:products(thumbnail, title, price, availabilityStatus))",
    )
    .eq("user_id", data?.user?.id)
    .order("id", { foreignTable: "carts_products", ascending: true })
    .single();

  const products = cart.data?.carts_products;
  return (
    <div className="min-h-screen">
      <Header />
      {products && products.length > 0 ? (
        <div className="w-10/12 bg-white shadow-lg shadow-black/10 rounded-lg mx-auto p-10">
          <h1
            className={`${fira.className} text-3xl drop-shadow-lg uppercase text-center mb-5`}
          >
            Cart Products
          </h1>
          <div className="w-full text-end">Price</div>
          <hr className="border-t border-gray-300 my-4" />
          {products.map((c: any, ind: number) => (
            <div
              key={ind}
              className="w-full rounded-lg my-3 flex justify-between"
            >
              <div className="flex">
                <Image
                  width={150}
                  height={150}
                  src={c.product.thumbnail}
                  alt={c.product.title}
                />
                <div className="flex flex-col items-start">
                  <h1 className={`${poppins.className}`}>{c.product.title}</h1>
                  <h1 className={`${fira.className} text-green-400`}>
                    {c.product.availabilityStatus}
                  </h1>
<<<<<<< HEAD
                  <div className="flex justify-start px-2 gap-3 border  rounded-lg">
                    <form action={decreaseQty.bind(null, c.id)}>
                      <button className="text-red-500">-</button>
                    </form>
=======
                  <div className="flex justify-start px-2 gap-3 border border-gray-300 rounded-lg">
                    <button className="text-red-500">-</button>
>>>>>>> 26f85b7954101afc99196c992b016e973477bc60
                    {c.qty}
                    <form action={increaseQty.bind(null, c.id)}>
                      <button className="text-green-500">+</button>
                    </form>
                  </div>
                </div>
              </div>
              <div
                className={`${poppins.className} text-green-400 flex flex-col items-center`}
              >
                ${c.product.price}
                <form action={removeFromCart.bind(null, c.id)}>
                  <button className="bg-red-500 p-2 rounded-lg text-white hover:bg-red-600 duration-300">
                    <Trash2 size={20} />
                  </button>
                </form>
              </div>
            </div>
          ))}
          <hr className="border-t border-gray-300 my-4" />
          <h1 className={`${montserrat.className} text-center mt-4`}>
            Place Order
          </h1>
          <form className="flex flex-col w-1/4 gap-3 mx-auto">
            <div className="flex flex-col">
              <label>First Name:</label>
              <input
                className="py-1 ps-2 rounded-lg border border-black"
                placeholder="John"
              />
            </div>
            <div className="flex flex-col">
              <label>Last Name:</label>
              <input
                className="py-1 ps-2 rounded-lg border border-black"
                placeholder="Smith"
              />
            </div>
            <div className="flex flex-col">
              <label>Adress</label>
              <input
                className="py-1 ps-2 rounded-lg border border-black"
                placeholder="Boulevar street nr.99"
              />
            </div>
            <button
              className={`${poppins.className} px-10 py-2 bg-yellow-400 shadow-lg rounded-full flex justify-center  gap-2 hover:bg-yellow-500 duration-300`}
            >
              <TruckElectric /> Place Order
            </button>
          </form>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 md:w-2/3 md:mx-auto">
          <div className="flex justify-center">
            <Image
              width={300}
              height={300}
              className="w-auto h-28"
              src={"/images/quickcart.png"}
              alt="Empty Cart"
              style={{ filter: "drop-shadow(0 8px 8px rgba(0, 0, 0, 0.2))" }}
            />
          </div>
          <h1 className={`${fira.className}`}>
            Cart is Empty! <br /> <Link className="text-white bg-orange-500 px-2 font-bold shadow-black/20 shadow py-1 rounded-lg hover:bg-orange-400 duration-300" href="/">Shop</Link> our most recent Products
          </h1>
        </div>
      )}
    </div>
  );
}
