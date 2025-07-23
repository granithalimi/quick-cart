"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";

export async function addToCart(id: number) {
  const supabase = await createClient();
  const auth = await supabase.auth.getUser();

  const cart_id = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", auth.data?.user?.id)
    .single();

  const { data, error } = await supabase.from("carts_products").insert({
    qty: 1,
    carts_id: cart_id.data?.id,
    product_id: id,
  });

  if (error) console.log(error);
  if (data) console.log(data);

  revalidatePath(`products/${id}`);
}

export async function increaseQty(id: number) {
  const supabase = await createClient();
  const cart = await supabase
    .from("carts_products")
    .select()
    .eq("id", id)
    .single();
  const old_qty = cart.data?.qty;

  const { data, error } = await supabase
    .from("carts_products")
    .update({ qty: old_qty + 1 })
    .eq("id", id);
  if (error) console.log(error);
  if (data) console.log(data);

  revalidatePath("/cart");
}

export async function decreaseQty(id: number) {
  const supabase = await createClient();
  const cart = await supabase
    .from("carts_products")
    .select()
    .eq("id", id)
    .single();
  const old_qty = cart.data?.qty;

  // Handle if there is only one Qty
  if (old_qty == 1) {
    const { data, error } = await supabase
      .from("carts_products")
      .delete()
      .eq("id", id);

    if (error) console.log(error);
    if (data) console.log(data);

    revalidatePath("/cart");
  }

  const { data, error } = await supabase
    .from("carts_products")
    .update({ qty: old_qty - 1 })
    .eq("id", id);
  if (error) console.log(error);
  if (data) console.log(data);

  revalidatePath("/cart");
}

export async function removeFromCart(id: number) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("carts_products")
    .delete()
    .eq("id", id);

  if (error) console.log(error);
  if (data) console.log(data);
  revalidatePath("cart");
}
