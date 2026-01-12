import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between">
      <Link to="/" className="font-bold text-xl">GigFlow</Link>

      <div className="flex gap-4 items-center">
        <Link to="/gigs">Browse Gigs</Link>
        {user && <Link to="/create">Post a Gig</Link>}
        {user && <Link to="/dashboard">Dashboard</Link>}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
