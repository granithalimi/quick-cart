import Header from "@/components/header";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import RecentProducts from "@/components/recent-products";
import ProductsSkeleton from "../skeleton/ProductsSkeleton";
import Products from "@/components/products";

export default async function Home() {
  const supabase = await createClient();

  const orders_table = await supabase.from("products").select().order("id", { ascending: true }).limit(5);
  const recent_products = orders_table?.data

  const all_categories = await fetch('https://dummyjson.com/products/category-list')
    .then(data => data.json())

  const products = [];

  for (let i = 0; i < all_categories.length; i++) {
    const product = await fetch(`https://dummyjson.com/products/category/${all_categories[i]}?limit=5`)
      .then(res => res.json())
      .then(data => data.products)
    products.push(product)
  }

  return (
    <main>
      <Header />
      <Suspense fallback={<ProductsSkeleton />}>
        {recent_products &&
          <RecentProducts recent_products={recent_products} />
        }
        <Products products={products} categories={all_categories} />
      </Suspense>

      {/* <Footer /> */}
    </main>
  )
}
