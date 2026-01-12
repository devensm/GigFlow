import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] bg-white shadow-md px-6 py-4">
      <div className="grid grid-cols-3 items-center">
        
        {/* Left: Logo */}
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/")}
            className="font-bold text-xl cursor-pointer"
          >
            GigFlow
          </button>
        </div>

        {/* Center: Navigation */}
        <div className="flex justify-center gap-6 pointer-events-auto">
          <button
            onClick={() => navigate("/gigs")}
            className="cursor-pointer hover:text-blue-600"
          >
            Browse Gigs
          </button>

          {user && (
            <button
              onClick={() => navigate("/create")}
              className="cursor-pointer hover:text-blue-600"
            >
              Post a Gig
            </button>
          )}

          {user && (
            <button
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer hover:text-blue-600"
            >
              Dashboard
            </button>
          )}
        </div>

        {/* Right: Auth */}
        <div className="flex justify-end">
          {!user ? (
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer hover:text-blue-600"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/register")}
                className="cursor-pointer hover:text-blue-600"
              >
                Register
              </button>
            </div>
          ) : (
            <button
              onClick={logout}
              className="text-red-500 cursor-pointer"
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
