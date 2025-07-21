import Header from "@/components/header";
import Image from "next/image";
import { fira } from "../font/fonts";

export default function Page() {
  return (
    <div>
      <Header />
      {/* If Cart is empty */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:w-2/3 md:mx-auto">
        <div className="flex justify-center">
          <Image
            width={300}
            height={300}
            className="w-auto h-28"
            src={"/images/quickcart.png"}
            alt="Empty Cart"
            style={{ filter: "drop-shadow(0 8px 8px rgba(0, 0, 0, 0.2))" }}
          />
        </div>
        <h1 className={`${fira.className}`}>Cart is Empty! <span>Shop our most recent Products</span></h1>
      </div>
    </div>
  );
}
