import Header from "@/components/header";
import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import RecentProducts from "@/components/recent-products";
import ProductsSkeleton from "../skeleton/ProductsSkeleton";
import Products from "@/components/products";
import Footer from "@/components/footer";

export default async function Home() {
  const supabase = await createClient();

  const products_table = await supabase
    .from("products")
    .select()
    .order("id", { ascending: false })
    .limit(5);
  const recent_products = products_table?.data;

  const all_products = await supabase
    .from("products")
    .select()
    .order("id", { ascending: true });
  const products = all_products?.data;

  return (
    <main>
      <Header />
      <Suspense fallback={<ProductsSkeleton />}>
        {recent_products && (
          <RecentProducts recent_products={recent_products} />
        )}
        {products && products.length > 0 && <Products products={products} />}
      </Suspense>

      <Footer />
    </main>
  );
}
