import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";
import Button from "./ui/Button";


const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/gigs", label: "Browse Gigs" },
    ...(user
      ? [
          { href: "/create", label: "Post a Gig" },
          { href: "/my-gigs", label: "My Gigs" },
          { href: "/my-bids", label: "My Bids" },
          { href: "/dashboard", label: "Dashboard" },
        ]
      : []),
  ];

  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 flex items-center gap-3 group"
            aria-label="GigFlow Home"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">GF</span>
            </div>
            <span className="hidden sm:block text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
              GigFlow
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 ml-8 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="px-4 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 hover:text-blue-600 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {user && <NotificationBell />}

            {!user ? (
              <div className="hidden sm:flex gap-2 items-center">
                <Link to="/login">
                  <Button variant="ghost" size="md">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="md">
                    Sign Up
                  </Button>
                </Link>
              </div>
            ) : (
              <button
                onClick={handleLogout}
                className="hidden sm:block px-4 py-2 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-200"
                aria-label="Logout"
              >
                Logout
              </button>
            )}

            {/* menu button for mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* mobile nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-gray-200 pt-3 mt-3">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-4 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-2.5 text-white bg-gradient-to-r from-blue-600 to-blue-700 font-medium rounded-lg hover:shadow-lg transition-all duration-200 mt-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2.5 text-red-600 font-medium rounded-lg hover:bg-red-50 transition-all duration-200"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
