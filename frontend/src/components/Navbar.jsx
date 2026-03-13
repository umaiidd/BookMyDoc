import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
    setShowProfileMenu(false);
    setShowMobileMenu(false);
    navigate("/");
  };

  const navItems = [
    { path: "/", label: "HOME" },
    { path: "/doctors", label: "ALL DOCTORS" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => {
            setShowMobileMenu(false);
            navigate("/");
          }}
        >
          <img
            src={assets.logo2}
            alt="BookMyDoc Logo"
            className="h-9 w-9 sm:h-10 sm:w-10 object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
          <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            BookMyDoc
          </h1>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-10">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              {({ isActive }) => (
                <div className="flex flex-col items-center group cursor-pointer">
                  <span className={`text-sm font-semibold tracking-wide transition-all ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}>
                    {item.label}
                  </span>
                  <span
                    className={`h-0.5 mt-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </div>
              )}
            </NavLink>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          {/* DESKTOP AUTH */}
          {token && userData ? (
            <div
              className="relative hidden md:block"
              onMouseEnter={() => setShowProfileMenu(true)}
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              <div className="flex items-center gap-2 cursor-pointer bg-gradient-to-r color:white hover:from-blue-100 hover:to-indigo-100 px-3 py-2 rounded-full transition-all">
                <img
                  src={userData.image}
                  alt="Profile"
                  className="h-8 w-8 rounded-full ring-2 ring-white shadow-sm object-cover"
                />
                <img
                  src={assets.dropdown_icon}
                  alt="Dropdown"
                  className={`h-4 w-4 transition-transform ${showProfileMenu ? "rotate-180" : ""}`}
                />
              </div>

              {showProfileMenu && (
                <div className="absolute right-0 top-full pt-2 z-50">
                  <div className="w-52 bg-white rounded-xl shadow-lg border border-gray-100 p-2 flex flex-col gap-1">
                    <p
                      onClick={() => { navigate("/my-profile"); setShowProfileMenu(false); }}
                      className="cursor-pointer px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 font-medium flex items-center gap-2 whitespace-nowrap"
                    >
                      <span>👤</span> My Profile
                    </p>
                    <p
                      onClick={() => { navigate("/my-appointments"); setShowProfileMenu(false); }}
                      className="cursor-pointer px-4 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-gray-700 hover:text-blue-600 font-medium flex items-center gap-2 whitespace-nowrap"
                    >
                      <span>📅</span> My Appointments
                    </p>
                    <hr className="my-1" />
                    <p
                      onClick={logout}
                      className="cursor-pointer px-4 py-2.5 rounded-lg hover:bg-red-50 transition-colors text-red-500 hover:text-red-600 font-medium flex items-center gap-2 whitespace-nowrap"
                    >
                      <span>🚪</span> Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:block">
              <button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-full hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all font-semibold text-sm whitespace-nowrap"
              >
                Create Account
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setShowMobileMenu((p) => !p)}
          >
            <img
              src={showMobileMenu ? assets.cross_icon : assets.menu_icon}
              alt="Menu"
              className="h-6 w-6"
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {showMobileMenu && (
        <div className="md:hidden bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 shadow-lg">
          <div className="flex flex-col px-5 py-5 gap-2">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setShowMobileMenu(false)}
              >
                {({ isActive }) => (
                  <div
                    className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.label}
                  </div>
                )}
              </NavLink>
            ))}

            <hr className="my-2" />

            {token ? (
              <div className="flex flex-col gap-2">
                <p
                  onClick={() => { navigate("/my-profile"); setShowMobileMenu(false); }}
                  className="cursor-pointer px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-gray-700 font-semibold text-sm flex items-center gap-3"
                >
                  <span>👤</span> My Profile
                </p>
                <p
                  onClick={() => { navigate("/my-appointments"); setShowMobileMenu(false); }}
                  className="cursor-pointer px-4 py-3 rounded-xl hover:bg-blue-50 transition-colors text-gray-700 font-semibold text-sm flex items-center gap-3"
                >
                  <span>📅</span> My Appointments
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer px-4 py-3 rounded-xl hover:bg-red-50 transition-colors text-red-500 font-semibold text-sm flex items-center gap-3"
                >
                  <span>🚪</span> Logout
                </p>
              </div>
            ) : (
              <button
                onClick={() => { setShowMobileMenu(false); navigate("/login"); }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all text-sm"
              >
                Create Account
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;