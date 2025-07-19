"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { fira } from "@/app/font/fonts";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return <button className={`${fira.className} font-bold text-sm px-3 py-1 bg-black hover:bg-gray-600 rounded-lg duration-300`} onClick={logout}>Logout</button>;
}
