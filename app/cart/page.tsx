import Header from "@/components/header";
import Image from "next/image";
import { fira } from "../font/fonts";
import { createClient } from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const cart = await supabase
    .from("carts")
    .select("cp:carts_products(product_id, qty, p:products(*))")
    .eq("user_id", data?.user?.id)
    .single();

  return (
    <div className="min-h-screen">
      <Header />
      {cart.data?.cp && cart.data?.cp.length > 0 ? (
        <div className="w-10/12 bg-white shadow-lg shadow-black/10 rounded-lg mx-auto p-10">
          {cart.data?.cp.map((c, ind) => (
            <div
              key={ind}
              className=" w-full border border-black rounded-lg"
            >
              test
            </div>
          ))}
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
