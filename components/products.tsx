"use client";

import { fira } from "@/app/font/fonts";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Products = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
}

export default function Products({ categories, products }: { categories: string[], products: Products[][] }) {
  const [category, setCategory] = useState<string[]>()
  const [product, setProducts] = useState<Products[][]>([])

  useEffect(() => {
    setCategory(categories)
    setProducts(products)
  }, [categories, products])

  return (
    <div className="flex flex-col items-center">
      {
        category && category.length > 0 &&
        category.map((c, ind: number) => (
          <div key={ind} className="w-10/12 bg-white py-10 rounded-md shadow-black/5 shadow-lg mb-10 flex flex-col justify-center items-center gap-3">
            <h1 className={`${fira.className} text-3xl drop-shadow-lg uppercase`}>{c}</h1>
            <div className="flex gap-3">
              {
                product && product.length > 0 &&
                product[ind].map((p:Products, index:number) => (
                  <Link href={`products/${p.id}`} key={index} className="flex flex-col justify-between border border-gray-500 rounded-lg w-60 shadow-black/5 shadow-lg hover:scale-105 cursor-pointer duration-500 p-5">
                    <div className="image flex justify-center">
                      <Image width={110} height={0} src={p.thumbnail} alt={p.title} />
                    </div>
                    <div className="flex flex-col justify-between">
                      <h1 className={` text-center`}>{p.title}</h1>
                      <h1 className=" text-xl ">${p.price}</h1>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  )
}
