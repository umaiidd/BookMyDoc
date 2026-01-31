import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="bg-white">

      <section className="px-4 sm:px-6 md:px-20 py-10 sm:py-14">

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">
            CONTACT <span className="text-blue-600">US</span>
          </p>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-10">

          {/* Image */}
          <img
            src={assets.contact_image}
            alt="Contact Prescripto"
            className="w-full sm:w-4/5 md:w-[40%] rounded-xl shadow-sm"
          />

          {/* Details */}
          <div className="md:w-[60%] space-y-5 text-gray-600 text-sm sm:text-base leading-relaxed text-center md:text-left">

            <p className="text-base sm:text-lg font-semibold text-gray-800">
              Our Office
            </p>

            <p>
              Prescripto Health Center <br />
              245 Wellness Avenue, <br />
              New City Medical District, <br />
              California, USA – 90001
            </p>

            <p>
              <span className="font-medium text-gray-800">Phone:</span> +1 (555) 123-4567 <br />
              <span className="font-medium text-gray-800">Email:</span> support@prescripto.com
            </p>

            <div className="pt-2">
              <p className="text-base sm:text-lg font-semibold text-gray-800">
                Careers at Prescripto
              </p>
              <p>
                Learn more about our teams, culture, and current job openings.
              </p>
            </div>

            <button className="mt-3 w-full sm:w-auto px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
              Explore Jobs
            </button>

          </div>
        </div>

      </section>
    </div>
  )
}

export default Contact
