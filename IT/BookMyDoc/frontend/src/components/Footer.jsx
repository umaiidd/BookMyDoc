import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-white mt-12">
      
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {/* Brand / Description */}
        <div className="md:col-span-2 text-center md:text-left">
          <img
            src={assets.logo}
            alt="logo"
            className="w-28 mx-auto md:mx-0"
          />
          <p className="text-gray-700 text-sm leading-relaxed mt-4 max-w-md mx-auto md:mx-0">
            Your trusted healthcare partner. Book appointments with certified
            and experienced doctors anytime, anywhere. We make healthcare
            simple, accessible, and convenient for everyone.
          </p>
        </div>

        {/* Company Links */}
        <div className="text-center md:text-left">
          <p className="text-gray-900 font-semibold text-base mb-3">
            COMPANY
          </p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li className="cursor-pointer hover:text-black">Home</li>
            <li className="cursor-pointer hover:text-black">About Us</li>
            <li className="cursor-pointer hover:text-black">Contact Us</li>
            <li className="cursor-pointer hover:text-black">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="text-center md:text-left">
          <p className="text-gray-900 font-semibold text-base mb-3">
            GET IN TOUCH
          </p>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>+91-1234-1424-23</li>
            <li>hospital@gmail.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 py-4 text-center px-4">
        <p className="text-gray-600 text-sm">
          © 2026 YourCompany. All rights reserved.
        </p>
      </div>

    </footer>
  )
}

export default Footer
