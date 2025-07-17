import Header from "@/components/header";

export default function Loading() {
  return (
    <>
      <Header />
      <div className="w-full flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-400 rounded-full animate-spin mx-auto" />
      </div>
    </>
  )
}
