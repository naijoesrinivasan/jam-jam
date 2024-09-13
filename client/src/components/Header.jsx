import React from "react";

export default function Header()  {
  return (
    <header className="row-span-1 border-2 border-red-500 flex justify-between items-center px-3 gap-4 w-full">
      <img src="/avatar.png" className='object-contain max-h-16 rounded-full' alt="Avatar" />
      <span className="">Jam-Jam</span>
    </header>
  )
}