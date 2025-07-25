"use client";
import { ArrowUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Footer() {
  const [scrolledDown, setScrolledDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledDown(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={() => handleClick()}
        className={`${scrolledDown ? "block show-arrow" : "hide-arrow"} fixed p-5 rounded-full bg-white shadow-black/20 shadow-lg bottom-5 right-5 hover:bg-gray-300`}
      >
        <ArrowUp className="text-3xl" />
      </button>
      <div className="w-full flex flex-col justify-center items-center bg-gray-800 py-10 mt-10 h-96">
        <div>
          <Image
            width={80}
            height={0}
            src={"/images/quickcart.png"}
            alt="Logo"
          />
        </div>
      </div>
    </>
  );
}
