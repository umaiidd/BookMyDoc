import React from "react";
import { assets } from "../assets/assets.js";

const Header = () => {
  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-blue-100 py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Section */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Book Appointment <br />
            <span className="text-blue-700">
              With Trusted Doctors
            </span>
          </h1>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <img
              src={assets.group_profiles}
              alt="group profiles"
              className="w-10 sm:w-12 md:w-16"
            />
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-sm">
              Explore trusted doctors and schedule your visit in seconds.
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-center md:justify-start">
            <a
              href="#speciality"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full shadow-md transition-all"
            >
              Book Appointment
              <img src={assets.arrow_icon} alt="arrow icon" className="w-4 sm:w-5" />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex justify-center">
          <img
            src={assets.header_img}
            alt="header"
            className="w-72 sm:w-80 md:w-full max-w-md md:max-w-lg drop-shadow-lg rounded-xl"
          />
        </div>

      </div>
    </section>
  );
};

export default Header;

