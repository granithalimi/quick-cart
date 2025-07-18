"use client"

import { fira } from "@/app/font/fonts"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

type RecentProducts = {
  id: number;
  name: string;
  price: number;
}

export default function RecentProducts({ recent_products }: { recent_products: RecentProducts[] }) {
  const [rp, setRp] = useState<RecentProducts[]>([])

  useEffect(() => {
    setRp(recent_products)
  }, [recent_products])

  return (
    <div className="flex flex-col items-center">
      {recent_products && recent_products.length > 0 &&
        (
          <div className="w-10/12 bg-white py-10 rounded-md shadow-black/5 shadow-lg mb-10 flex flex-col justify-center items-center gap-3">
            <h1 className={`${fira.className} text-3xl drop-shadow-lg uppercase`}>Recent Products</h1>
            <div className="flex gap-3">
              {
                rp && rp.length > 0 &&
                rp.map((p: RecentProducts, index: number) => (
                  <Link href={`products/${p.id}`} key={index} className="flex flex-col justify-between border border-gray-500 rounded-lg w-60 shadow-black/5 shadow-lg hover:scale-105 cursor-pointer duration-500 p-5">
                    <div className="image flex justify-center">
                      <Image className="h-auto" width={110} height={0} src={"/images/quickcart.png"} alt={p.name} />
                    </div>
                    <div className="flex flex-col justify-between">
                      <h1 className={` text-center`}>{p.name}</h1>
                      <h1 className=" text-xl ">${p.price}</h1>
                    </div>
                  </Link>
                ))
              }
            </div>
          </div>
        )
      }
    </div>
  )
}
