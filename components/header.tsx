import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-16 bg-gray-800 mb-10 shadow-black/20 shadow-lg">
      <nav className="w-4/5 h-full mx-auto flex justify-between">
        <div className="w-2/12 h-full flex justify-center items-center">
          <Link href={"/"} className="text-white">
            <Image height={40} className="w-auto h-auto" width={40} alt="Logo" src={"/images/quickcart.png"} />
          </Link>
        </div>
        <div className="flex justify-center items-center h-full w-8/12">
          <form className="flex justify-center items-center w-full h-full">
            <input className="w-9/12 border-gray-500 font-bold text-md bg-gray-200 ps-3 py-2 rounded-l-lg" placeholder="Search..." />
            <button className="text-md font-bold text-white px-3 py-2 bg-yellow-400 rounded-r-lg hover:bg-yellow-500 duration-500">Search</button>
          </form>
        </div>
        <div className="flex w-2/12 h-full items-center justify-center gap-3">
          <Link href={"/"} className="text-white">Products</Link>
          <Link href={"/"} className="text-white">Test</Link>
        </div>
      </nav>
    </header>
  )
}
