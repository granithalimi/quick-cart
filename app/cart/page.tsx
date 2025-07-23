import Header from "@/components/header";
import Image from "next/image";
import { fira, montserrat, poppins } from "../font/fonts";
import { createClient } from "@/lib/supabase/server";
import { TruckElectric } from "lucide-react";

export default async function Page() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const cart = await supabase
    .from("carts")
    .select("cp:carts_products(product_id, qty, p:products(*))")
    .eq("user_id", data?.user?.id)
    .single();
  console.log(cart)

  return (
    <div className="min-h-screen">
      <Header />
      {cart.data?.cp && cart.data.cp.length > 0 ? (
        <div className="w-10/12 bg-white shadow-lg shadow-black/10 rounded-lg mx-auto p-10">
          <h1 className={`${fira.className} text-3xl drop-shadow-lg uppercase text-center mb-5`}>Cart Products</h1>
          <div className="w-full text-end">Price</div>
          <hr />
          {cart.data?.cp.map((c, ind) => (
            <div
              key={ind}
              className="w-full rounded-lg my-3 flex justify-between"
            >
              <div className="flex">
                <Image width={150} height={150} src={c.p.thumbnail} alt={c.p.title} />
                <div className="flex flex-col items-start">
                  <h1 className={`${poppins.className}`}>{c.p.title}</h1>
                  <h1 className={`${fira.className} text-green-400`}>{c.p.availabilityStatus}</h1>
                  <div className="flex justify-start px-2 gap-3 border  rounded-lg">
                    <button className="text-red-500">-</button>{c.qty}<button className="text-green-500">+</button>
                  </div>
                </div>
              </div>
              <div className={`${poppins.className} text-green-400 `}>${c.p.price}</div>
            </div>
          ))}
          <hr />
          <h1 className={`${montserrat.className} text-center mt-4`}>Place Order</h1>
          <form className="flex flex-col w-1/4 gap-3 mx-auto">
            <div className="flex flex-col">
              <label>First Name:</label>
              <input className="py-1 ps-2 rounded-lg border border-black" placeholder="John" />
            </div>
            <div className="flex flex-col">
              <label>Last Name:</label>
              <input className="py-1 ps-2 rounded-lg border border-black" placeholder="Smith" />
            </div>
            <div className="flex flex-col">
              <label>Adress</label>
              <input className="py-1 ps-2 rounded-lg border border-black" placeholder="Boulevar street nr.99" />
            </div>
            <button className={`${poppins.className} px-10 py-2 bg-yellow-400 shadow-lg rounded-full flex justify-center  gap-2 hover:bg-yellow-500 duration-300`}>
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
            Cart is Empty! <span>Shop our most recent Products</span>
          </h1>
        </div>
      )}
    </div>
  );
}
