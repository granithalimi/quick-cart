"use client"
import { useState } from "react";
import { LogoutButton } from "./logout-button";

export default function Account({ email, role }: { email: string | undefined, role: string | undefined }) {
  const [view, setView] = useState(false)
  return (
    <div onMouseEnter={() => setView(true)} onMouseLeave={() => setView(false)} className="text-sm cursor-default p-1 rounded-t-sm hover:border relative text-start">
      Welcome, <br /> {email}
      <div className={`${view ? "flex flex-col items-center gap-2" : "hidden"} w-full absolute text-xs top-full left-0 bg-white rounded-b-sm p-1 outline outline-1 outline-gray-400`}>
        <div className="w-full mt-3">
          <p className="text-black">Email: {email}</p>
          <p className="text-black">email</p>
        </div>
        <div className="w-full">
          <p className="text-black">Role:</p>
          <p className="text-black uppercase">{role}</p>
        </div>
        <div className="mb-3">
          <LogoutButton />
        </div>
      </div>
    </div>
  )
}
