import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../utils/userSlice";

function Header() {

  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-green-700 via-green-600 to-green-500 backdrop-blur-md shadow-lg w-screen">

      <div className="max-w-7xl mx-auto flex items-center justify-between h-[70px] px-8">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-white text-2xl font-bold tracking-wide hover:scale-110 transition duration-300 cursor-pointer">
            🌱 SmartAgriConnect
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4 text-white font-medium">

          <Link
            to="/home"
            className="px-4 py-2 rounded-lg hover:bg-white hover:text-green-700 transition duration-300"
          >
            Home
          </Link>

          <Link
            to="/marketplace"
            className="px-4 py-2 rounded-lg hover:bg-white hover:text-green-700 transition duration-300"
          >
            Marketplace
          </Link>

          <Link
            to="/agriblogs"
            className="px-4 py-2 rounded-lg hover:bg-white hover:text-green-700 transition duration-300"
          >
            AgriBlogs
          </Link>

          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-lg hover:bg-white hover:text-green-700 transition duration-300"
          >
            Dashboard
          </Link>

          <Link
            to="/about"
            className="px-4 py-2 rounded-lg hover:bg-white hover:text-green-700 transition duration-300"
          >
            About
          </Link>

          {/* Login / Logout Button */}
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-white text-green-700 rounded-lg font-semibold hover:scale-105 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-white text-green-700 rounded-lg font-semibold hover:scale-105 transition duration-300"
            >
              Login
            </Link>
          )}

        </nav>

      </div>
    </header>
  );
}

export default Header;