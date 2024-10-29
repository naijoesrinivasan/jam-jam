import { sidebarLinks } from "../lib/constants";

export default function Bottombar() {
  return (
    <nav className="">
      <ul className="flex md:hidden bg-black bg-opacity-60 border justify-center gap-6">
        {sidebarLinks.map((link) => (
          <li key={link.title}>{link.title}</li>
        ))}
      </ul>
    </nav>
  )
}