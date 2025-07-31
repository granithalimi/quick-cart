import Header from "@/components/header";
import { fira, poppins } from "../font/fonts";
import Image from "next/image";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | undefined }>;
}) {
  const {q} = await searchParams
  const prods = await fetch(
    `https://dummyjson.com/products/search?q=${q}`,
  )
    .then((res) => res.json())
    .then((data) => data.products);

  return (
    <main>
      <Header />
      <div className="flex flex-col items-center">
        {prods && prods.length > 0 ? (
          <>
            <div className="w-11/12 lg:w-10/12 bg-white py-10 rounded-md shadow-black/5 shadow-lg mb-10 flex flex-col justify-center items-center gap-3 my-10">
              <h1 className="text-center">
                Search:
                <span className={`${poppins.className}`}>
                  `{q}`
                </span>
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {prods.map(
                  (
                    p: {
                      id: number;
                      thumbnail: string;
                      title: string;
                      price: number;
                    },
                    ind: number,
                  ) => (
                    <Link
                      href={`products/${p.id}`}
                      key={ind}
                      className="flex flex-col justify-between border border-gray-500 rounded-lg w-36 lg:w-60 shadow-black/5 shadow-lg hover:scale-105 cursor-pointer duration-500 p-5"
                    >
                      <div className="image flex justify-center">
                        <Image
                          width={110}
                          height={0}
                          src={p.thumbnail}
                          alt={p.title}
                          className="h-auto"
                          unoptimized
                        />
                      </div>
                      <div className="flex flex-col justify-between">
                        <h1
                          className={`${poppins.className} text-sm lg:text-base text-center text-gray-600`}
                        >
                          {p.title}
                        </h1>
                        <h1
                          className={`${fira.className} lg:text-xl text-green-500 font-extrabold`}
                        >
                          ${p.price}
                        </h1>
                      </div>
                    </Link>
                  ),
                )}
              </div>
            </div>
          </>
        ) : (
          <h1 className="my-10">
            No Products associated with the name:
            <span className={`${poppins.className}`}>`{q}`</span>
          </h1>
        )}
      </div>
    </main>
  );
}
