import { createClient } from "@/lib/supabase/server";

export default async function seed() {
  const test = await fetch("https://dummyjson.com/products?limit=0&select=id,title,price,thumbnail,images,description,availabilityStatus,discountPercentage,stock,category,rating,reviews")
    .then((res) => res.json())
    .then((res) => res.products);

  console.log("test", test)
  const supabase = await createClient();
  const { data, error } = await supabase.from("products").insert(test);

  if (error) console.log("error", error);
  if (data) console.log("data", data);

  return (
    <main style={{ padding: 32 }}>
      <h1>{data ? "✅ Database is seeded!" : "❌ Database is empty."}</h1>
    </main>
  );
}
