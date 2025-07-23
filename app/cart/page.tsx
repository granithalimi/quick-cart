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
  console.log(cart.data?.cp);

  return (
    <div className="min-h-screen">
      <Header />
      {cart.data?.cp && cart.data?.cp.length > 0 ? (
        <div className="w-10/12 bg-white shadow-lg shadow-black/10 rounded-lg mx-auto">
          {cart.data?.cp.map((c, ind) => (
            <div
              key={ind}
              className="flex flex-col gap-3 justify-center items-center"
            >
              <div className="grid grid-cols-3 gap-3 font-extrabold">
                <h1 className="w-[100px]">Image</h1>
                <h1>Title</h1>
                <h1>Qty</h1>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Image
                  src={c.p.thumbnail}
                  alt={c.p.title}
                  width={100}
                  height={100}
                />
                <h1>{c.p.title}</h1>
                <h1>{c.qty}</h1>
              </div>
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
