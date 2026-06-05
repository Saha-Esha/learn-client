import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiUser } from "react-icons/fi";
import logo from "../../assets/Gemini_Generated_Image_5uuvlv5uuvlv5uuv.png";
import { useAuth } from "../../Provider/AuthContext.jsx";
const Nabar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleLogout = () => {
    logout(); // clear user
    setOpen(false); // close dropdown
    navigate("/enterUser"); // redirect to login page
  };
  return (
    <nav className=" text-Black shadow-md sticky ">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}

          <div className="flex-shrink-0 font-bold text-xl">
            <Link to="/home">
              <img src={logo} className="w-[70px] " alt="" srcset="" />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/chat" className="hover:text-gray-200 transition">
              Chat
            </Link>
            {/* User dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 hover:text-gray-200 transition"
              >
                <FiUser size={20} />
                Profile
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-gray-800 rounded shadow-lg transition-opacity duration-200">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)} // close after click
                  >
                    My Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-blue-500">
          <Link to="/" className="block px-4 py-2 hover:bg-blue-400 transition">
            Home
          </Link>
          <Link
            to="/lessons"
            className="block px-4 py-2 hover:bg-blue-400 transition"
          >
            Lessons
          </Link>
          <Link
            to="/quiz"
            className="block px-4 py-2 hover:bg-blue-400 transition"
          >
            Quiz
          </Link>
          <Link
            to="/chat"
            className="block px-4 py-2 hover:bg-blue-400 transition"
          >
            Chat
          </Link>
          <Link
            to="/profile"
            className="block px-4 py-2 hover:bg-blue-400 transition"
          >
            Profile
          </Link>
          <Link
            to="/logout"
            className="block px-4 py-2 hover:bg-blue-400 transition"
          >
            Logout
          </Link>
        </div>
      )}
    </nav>
  );
};
export default Nabar;
