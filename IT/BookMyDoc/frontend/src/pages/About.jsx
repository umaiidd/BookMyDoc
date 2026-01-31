import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="bg-white">

      {/* ABOUT US */}
      <section className="px-4 sm:px-6 md:px-20 py-10 sm:py-14">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">
            ABOUT <span className="text-blue-600">US</span>
          </p>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <img
            src={assets.about_image}
            alt="About Prescripto"
            className="w-full sm:w-4/5 md:w-[40%] rounded-xl shadow-md"
          />

          <div className="md:w-[60%] space-y-4 text-gray-600 text-sm sm:text-base leading-relaxed">
            <p>
              Welcome to <span className="font-medium text-gray-800">Prescripto</span>, a
              smart platform for booking doctor appointments online with ease and confidence.
            </p>

            <p>
              We connect patients with verified healthcare professionals across multiple
              specialties, enabling quick scheduling and seamless access to care.
            </p>

            <p className="text-base sm:text-lg font-semibold text-gray-800">
              Our Vision
            </p>

            <p>
              To simplify healthcare access through reliable, technology-driven solutions
              focused on patient convenience.
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="px-4 sm:px-6 md:px-20 py-14 sm:py-20 bg-white">
        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-xl sm:text-2xl font-semibold text-gray-800">
            WHY <span className="text-blue-600">CHOOSE US</span>
          </p>
          <div className="w-12 h-1 bg-blue-600 mx-auto mt-3 rounded-full"></div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {[
            {
              title: 'Efficiency',
              desc: 'Book appointments quickly with real-time availability, automated scheduling, and instant confirmations that save valuable time.',
            },
            {
              title: 'Convenience',
              desc: 'Manage appointments, consult doctors, and access healthcare services anytime, anywhere through a single intuitive platform.',
            },
            {
              title: 'Personalization',
              desc: 'Experience tailored recommendations, reminders, and care options based on your preferences and medical history.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-xl p-5 sm:p-6 transition hover:border-blue-500"
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default About
