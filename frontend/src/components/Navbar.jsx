import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl">
          GigFlow
        </Link>

        {/* Center Nav */}
        <div className="flex gap-6 items-center">
          <Link to="/gigs" className="hover:text-blue-600">
            Browse Gigs
          </Link>

          {user && (
            <>
              <Link to="/create" className="hover:text-blue-600">
                Post a Gig
              </Link>

              <Link to="/my-gigs" className="hover:text-blue-600">
                My Gigs
              </Link>

              <Link to="/my-bids" className="hover:text-blue-600">
                My Bids
              </Link>

              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="flex gap-4 items-center">
          {!user ? (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-600">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
