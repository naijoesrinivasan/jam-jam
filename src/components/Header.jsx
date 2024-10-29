import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Header()  {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login')
  }
  return (
    <header className="p-2 md:p-4 bg-black bg-opacity-80 flex justify-between">
      <Link to={'/'}>
        <h1>Fleetwave</h1>
      </Link>
      <button className="text-white" onClick={handleLogout}>Logout</button>
    </header>
  )
}