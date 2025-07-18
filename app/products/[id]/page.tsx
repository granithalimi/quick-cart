import { montserrat, poppins } from "@/app/font/fonts";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ProductSlider from "@/components/product-slider/product-slider";
import formatDate from "@/lib/helpers"
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const product = await fetch(`https://dummyjson.com/products/${id}`)
    .then(data => data.json())

  const rating = []
  for (let i = 0; i < Math.floor(product.rating); i++) {
    rating.push(<Image key={i} width={0} height={0} src={"/images/rating.png"} alt="rating_star" className="w-6 h-auto" style={{ filter: "drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3))" }} />)
  }

  return (
    <div>
      <Header />
      <main className="w-full">
        <div className="mx-auto w-2/3 flex gap-10">

          {product &&
            (
              <>
                <div className="w-1/2 flex justify-center ">
                  <ProductSlider images={product.images} />
                </div>
                <div className="w-1/2 flex flex-col gap-5">
                  <h1 className={`${montserrat.className} text-4xl`}>{product.title}</h1>
                  <p className={`${poppins.className} text-gray-400 text-lg`}>{product.description}</p>
                  <p className={`${poppins.className} text-3xl`}>${product.price}</p>
                  <div className="text-gray-600">
                    <p className={`${poppins.className}`}>Availability: <span className="text-green-500">{product.availabilityStatus}</span></p>
                    <p className={`${poppins.className}`}>Stock: <span className="text-black">{product.stock}</span></p>
                    <p className={`${poppins.className}`}>Category: <span className="uppercase text-black">{product.category}</span></p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <h1 className={`${poppins.className} text-gray-600 text-lg`}>Rating:</h1>
                    {rating}
                  </div>
                  <div>
                    <h1 className={`${poppins.className} text-gray-600 text-lg`}>Reviews:</h1>
                    <div className="flex flex-col gap-3">
                      {product.reviews.map((r: { rating: string, reviewerEmail: string, comment: string, date: string }, ind: number) => (
                        <div className="flex gap-3 border rounded-lg p-2" key={ind}>
                          <div className="h-full flex items-center">
                            <h1 className={`${poppins.className} text-2xl text-gray-700`}>{r.rating}/5</h1>
                          </div>
                          <div>
                            <h1 className={`${poppins.className} text-gray-400 text-sm`}>{r.reviewerEmail}</h1>
                            <p className={`${poppins.className} text-gray-500 text-md`} >{r.comment}</p>
                          </div>
                          <div className="ms-auto flex items-center">
                            <p>{formatDate(r.date)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="my-10 flex justify-center items-center">
                    <button className={`${poppins.className} px-10 py-2 bg-yellow-400 shadow-lg rounded-full flex gap-2 hover:bg-yellow-500 duration-300`}>
                      <ShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </>
            )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
