import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-white px-3 sm:px-4 pb-4 mt-12">

      {/* Main Footer Card */}
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-white to-white border border-gray-200 rounded-2xl px-5 sm:px-8 py-8 sm:py-10 shadow-sm">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand / Description */}
          <div className="sm:col-span-2 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start mb-3">
              <img
                src={assets.logo2}
                alt="logo"
                className="h-9 w-9 sm:h-10 sm:w-10 object-contain rounded-full"
                style={{ mixBlendMode: "multiply" }}
              />
              <h2 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                BookMyDoc
              </h2>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
              Your trusted healthcare partner. Book appointments with certified
              and experienced doctors anytime, anywhere. We make healthcare
              simple, accessible, and convenient for everyone.
            </p>
          </div>

          {/* Company Links */}
          <div className="text-center sm:text-left">
            <p className="font-semibold text-sm tracking-wide text-gray-900 mb-4">
              COMPANY
            </p>
            <ul className="space-y-2.5 text-sm text-gray-600">
              {["Home", "About Us", "Contact Us", "Privacy Policy"].map((item) => (
                <li
                  key={item}
                  className="cursor-pointer hover:text-blue-600 transition-colors flex items-center gap-1.5 justify-center sm:justify-start"
                >
                  <span className="h-0.5 w-3 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full inline-block" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <p className="font-semibold text-sm tracking-wide text-gray-900 mb-4">
              GET IN TOUCH
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm text-sm shrink-0">📞</span>
                <span>+91-1234-1424-23</span>
              </li>
              <li className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="h-8 w-8 bg-white border border-gray-200 rounded-full flex items-center justify-center shadow-sm text-sm shrink-0">✉️</span>
                <span>hospital@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto py-4 text-center">
        <p className="text-gray-500 text-xs">
          © 2026{" "}
          <span className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            BookMyDoc
          </span>
          . All rights reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer