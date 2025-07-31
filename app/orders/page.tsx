/* eslint-disable @typescript-eslint/no-explicit-any */

import Header from "@/components/header";
import { createClient } from "@/lib/supabase/server";
import { fira, poppins } from "../font/fonts";
import Image from "next/image";
import Footer from "@/components/footer";
import Link from "next/link";

export default async function Page() {
  const supabase = await createClient();
  const auth = await supabase.auth.getUser();

  const { data } = await supabase
    .from("orders")
    .select(
      "id,status,op:orders_products(qty, product:products(title,thumbnail,price))",
    )
    .eq("user_id", auth.data?.user?.id);

  const orderTotals = data?.map((order) => {
    const total = order.op.reduce((sum, item: any) => {
      return sum + item.qty * item.product.price;
    }, 0);
    return total.toFixed(2);
  });
  return (
    <main>
      <Header />
      {data && data.length > 0 ? (
        <div className="w-11/12 lg:w-10/12 bg-white shadow-lg shadow-black/10 rounded-lg mx-auto my-10 py-10 px-4 lg:px-10">
          <h1
            className={`${fira.className} text-3xl drop-shadow-lg uppercase text-center mb-5`}
          >
            Orders
          </h1>
          <div className="w-full flex justify-enditems-center">
            <h1 className="text-xs md:text-base ms-auto">Total Price/Status</h1>
          </div>
          {data.map((o, ind) => (
            <div
              key={ind}
              className="w-full rounded-md my-3 py-1 flex justify-between border-y border-gray-300"
            >
              <div className="flex">
                <h1 className={`text-base md:text-lg`}>#{o.id}</h1>
                <div>
                  {o.op.map((p: any, p_ind) => (
                    <div key={p_ind} className="flex">
                      <Image
                        width={150}
                        height={150}
                        src={p.product.thumbnail}
                        alt={p.product.title}
                        className="w-[65px] h-[65px] md:w-[150px] md:h-[150px]"
                      />
                      <div className="text-xs md:text-base">
                        <h1 className={`${poppins.className}`}>
                          {p.product.title}
                        </h1>
                        <h1>Price: ${p.product.price}</h1>
                        <h1>Qty: {p.qty}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h1
                  className={`${poppins.className} text-xs md:text-base text-green-500`}
                >
                  ${orderTotals && orderTotals[ind]}
                </h1>
                {o.status == "pending" && (
                  <h1 className="text-xs px-2 py-1 bg-gray-500 md:text-base text-white rounded-lg">
                    Pending
                  </h1>
                )}
                {o.status == "delivered" && (
                  <h1 className="text-xs px-2 py-1 bg-green-500 md:text-base text-white rounded-lg">
                    Delivered
                  </h1>
                )}
                {o.status == "ontheway" && (
                  <h1 className="text-xs px-2 py-1 bg-orange-500 md:text-base text-white rounded-lg">
                    Ontheway
                  </h1>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 w-11/12 gap-3 md:w-2/3 mx-auto mt-10">
          <div className="flex justify-center">
            <Image
              width={300}
              height={300}
              className="w-auto h-28"
              src={"/images/order.svg"}
              alt="Empty Cart"
              style={{ filter: "drop-shadow(0 8px 8px rgba(0, 0, 0, 0.2))" }}
            />
          </div>
          <h1 className={`${fira.className} md:text-center text-start`}>
            Order is Empty! <br />{" "}
            <Link
              className="text-white bg-orange-500 px-2 font-bold shadow-black/20 shadow py-1 rounded-lg hover:bg-orange-400 duration-300"
              href="/"
            >
              Shop
            </Link>{" "}
            our most recent Products
          </h1>
        </div>
      )}

      {data && data.length > 0 && <Footer />}
    </main>
  );
}
