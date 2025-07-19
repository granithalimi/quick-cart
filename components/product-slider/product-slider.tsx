"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image";

type Images = {
  images: string[]
}

export default function ProductSlider({ images }: Images) {
  const [index, setindex] = useState<number>(0)
  const [image, setImages] = useState<string[]>()

  const right = () => {
    if (index === images.length - 1) {
      setindex(0)
    } else {
      setindex(p => p + 1)
    }

  }
  const left = () => {
    if (index === 0) {
      setindex(images.length - 1)
    } else {
      setindex(p => p - 1)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setImages(images)
    console.log(images)
  }, [images])

  return (
    <div className="h-80 mx-auto flex overflow-hidden relative">
      {
        image && image.length > 0 &&
        image.map((img, ind: number) => (
          <Image key={ind} width={1000} height={1000} alt="product" src={img} className="w-full h-full object-contain shrink-0 grow-0 duration-300" style={{ translate: `${-100 * index}%` }} />
        ))
      }
      <button onClick={() => left()} className={`${images.length > 1 ? "absolute" : "hidden"} px-3 left-0 top-0 bottom-0 hover:bg-[rgb(0,0,0,0.1)] text-2xl duration-500`}><ArrowLeftIcon /></button>
      <button onClick={() => right()} className={`${images.length > 1 ? "absolute" : "hidden"} px-3 right-0 top-0 bottom-0 hover:bg-[rgb(0,0,0,0.1)] text-2xl duration-500`}><ArrowRightIcon /></button>
    </div>
  )
}
