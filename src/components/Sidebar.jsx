import { sidebarLinks } from "../lib/constants"
import { Link } from "react-router-dom"

export default function Sidebar() {
  return (
    <section className="hidden md:block bg-black bg-opacity-80 p-2 md:p-4 backdrop-blur-md">
      {sidebarLinks.map((link) => (
        <div key={link.title} className="flex flex-col gap-2 md:gap-4 p-2 md:p-4">
          <h2>{link.title}</h2>
          <nav>
            <ul className="flex flex-col gap-1 md:gap-2 ">
              {link.links.map((child, index) => (
                <Link key={child} to={link.href[index]}>
                  <li className="cursor-pointer bg-green-400 bg-opacity-10 hover:bg-opacity-70 hover:text-white p-2 rounded-md">{child}</li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      ))}
    </section>
  )
}