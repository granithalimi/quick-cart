"use client";

import { useState } from "react";
import image1 from "@/public/images/slider/pic1.jpg"
import image2 from "@/public/images/slider/pic2.jpg"
import image3 from "@/public/images/slider/pic3.jpg"
import image4 from "@/public/images/slider/pic4.jpg"
import Image from "next/image";
import { MoveLeft, MoveRight } from "lucide-react";

export default function Slider() {
  const [index, setindex] = useState(0);
  // const intervalId = useRef(null);
  //
  // useEffect(() => {
  //   intervalId.current = setInterval(() => {
  //     right()
  //   }, 3000)
  //
  //   return () => {
  //     clearInterval(intervalId.current)
  //   }
  // }, [index])

  const right = () => {
    if (index === images.length - 1) {
      setindex(0);
    } else {
      setindex((p) => p + 1);
    }
  };
  const left = () => {
    if (index === 0) {
      setindex(images.length - 1);
    } else {
      setindex((p) => p - 1);
    }
  };

  const change = (ind: number) => {
    setindex(ind);
  };

  const images = [image1, image2, image3, image4];

  return (
    <div className="w-full h-full mb-10">
      <div className="w-full xl:h-[615px] md:h-[380px] h-[250px] flex overflow-hidden relative">
        {images.map((img, ind) => (
          <Image
            key={ind}
            src={img}
            alt="sliderImage"
            className="w-full h-full object-cover shrink-0 grow-0 duration-300"
            style={{ translate: `${-100 * index}%` }}
          />
        ))}
        <button
          onClick={() => left()}
          className="absolute px-3 left-0 top-0 bottom-0 hover:bg-[rgb(0,0,0,0.5)] bg-[rgb(0,0,0,0.2)] text-white text-2xl duration-500"
        >
          <MoveLeft className="text-white" />
        </button>
        <button
          onClick={() => right()}
          className="absolute px-3 right-0 top-0 bottom-0 hover:bg-[rgb(0,0,0,0.5)] bg-[rgb(0,0,0,0.2)] text-white text-2xl duration-500"
        >
          <MoveRight />
        </button>
        <div className="absolute bottom-0 h-10 w-full flex justify-center items-center">
          {images.map((_, ind) => (
            <button
              key={ind}
              onClick={() => change(ind)}
              className={`${ind === index ? "p-2" : "p-1"} rounded-lg bg-white mx-3 duration-300`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
}
