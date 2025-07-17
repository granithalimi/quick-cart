export default function ProductsSkeleton() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-10/12 bg-white py-10 rounded-md shadow-black/5 shadow-lg mb-10 flex flex-col justify-center items-center gap-3">
        <div className="w-3/12 h-10 rounded-lg animated-gray-box"></div>
        <div className="flex gap-6">
          <div className="flex flex-col p-5 gap-3 border border-gray-300 rounded-lg">
            <div className="w-36 h-36 animated-gray-box rounded-lg mx-auto"></div>
            <div className="w-36 h-4 animated-gray-box rounded-lg"></div>
            <div className="w-16 h-4 animated-gray-box rounded-lg"></div>
          </div>
          <div className="flex flex-col p-5 gap-3 border border-gray-300 rounded-lg">
            <div className="w-36 h-36 animated-gray-box rounded-lg mx-auto"></div>
            <div className="w-36 h-4 animated-gray-box rounded-lg"></div>
            <div className="w-16 h-4 rounded-lg animated-gray-box"></div>
          </div>
          <div className="flex flex-col p-5 gap-3 border border-gray-300 rounded-lg">
            <div className="w-36 h-36 animated-gray-box rounded-lg mx-auto"></div>
            <div className="w-36 h-4 rounded-lg animated-gray-box"></div>
            <div className="w-16 h-4 rounded-lg animated-gray-box"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
