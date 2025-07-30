"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "./supabase/server";
import { redirect } from "next/navigation";

export async function addToCart(id: number, formData: FormData) {
  const supabase = await createClient();
  const auth = await supabase.auth.getUser();
  const qty = formData.get("qty") as string;

  // Check if user is authenticated
  if (!auth.data || auth.error) {
    return redirect("auth/login");
  }

  const cart_id = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", auth.data?.user?.id)
    .single();

  // Check if qty is 0
  if (parseInt(qty) < 1 || !qty) {
    return revalidatePath(`products/${id}`);
  }

  // Check if Prod exists in Cart
  const cp = await supabase
    .from("carts_products")
    .select()
    .eq("product_id", id)
    .eq("carts_id", cart_id.data?.id);

  // If doesnt exist create it, else add the qty
  if (cp.data && cp.data.length > 0) {
    const new_qty = parseInt(cp.data[0].qty) + parseInt(qty);
    const { data, error } = await supabase
      .from("carts_products")
      .update({ qty: new_qty })
      .eq("id", cp.data[0].id);

    if (error) console.log(error);
    if (data) console.log(data);

    revalidatePath(`products/${id}`);
  } else {
    const { data, error } = await supabase.from("carts_products").insert({
      qty: qty,
      carts_id: cart_id.data?.id,
      product_id: id,
    });

    if (error) console.log(error);
    if (data) console.log(data);

    revalidatePath(`products/${id}`);
  }
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

export async function placeOrder() {
  const supabase = await createClient();
  const auth = await supabase.auth.getUser();

  // Check if user is authenticated
  if (!auth.data || auth.error) {
    return redirect("auth/login");
  }

  // Create Order
  const user_id = auth.data?.user.id;
  const { data, error } = await supabase
    .from("orders")
    .insert({ user_id: user_id })
    .select("id")
    .single();
  if (error) console.log(error);
  if (data) console.log(data);

  // Get Cart
  const cart = await supabase
    .from("carts")
    .select("*, cp:carts_products(*)")
    .eq("user_id", user_id)
    .order("id", { ascending: true })
    .single();

  // Check Cart length
  if (cart.data?.cp && cart.data?.cp.length > 0) {
    const cart_length = cart.data?.cp.length;
    // Set Products for the Orders
    for (let i = 0; i < cart_length; i++) {
      await supabase
        .from("orders_products")
        .insert({
          order_id: data?.id,
          product_id: cart.data.cp[i].product_id,
          qty: cart.data.cp[i].qty,
        });
    }
  }

  await supabase.from("carts_products").delete().eq("carts_id", cart.data?.id)
  redirect("/orders")
}
