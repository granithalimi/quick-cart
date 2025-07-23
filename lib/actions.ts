"use server";

import { createClient } from "./supabase/server";

export async function addToCart(id: number) {
  const supabase = await createClient();
  const auth = await supabase.auth.getUser();

  const cart_id = await supabase.from("carts").select("id").eq("user_id", auth.data?.user?.id).single()

  const { data, error } = await supabase.from("carts_products").insert({
    qty: 1,
    carts_id: cart_id.data?.id,
    product_id: id,
  });

  if (error) console.log(error);
  if (data) console.log(data);
}
