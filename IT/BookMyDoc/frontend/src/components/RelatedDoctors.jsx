import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <section className="w-full py-10 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 text-center">
          Top Doctors to Book
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 text-sm sm:text-base text-center max-w-xl mx-auto mt-3">
          Your health deserves the best care. Choose from our top-rated and patient-trusted doctors.
        </p>

        {/* Doctors Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mt-8 sm:mt-10">
          {relDoc.slice(0, 5).map((item, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="bg-white border rounded-lg p-3 sm:p-4 cursor-pointer transition
                         hover:shadow-lg md:hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-36 sm:h-44 object-cover rounded-lg"
              />

              <div className="mt-3 space-y-1">
               <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${item.available
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-500'
                    }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
                <p className="font-semibold text-gray-900 text-sm sm:text-base">
                  {item.name}
                </p>

                <p className="text-blue-600 text-sm font-medium">
                  {item.speciality}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-8 sm:mt-10">
          <button
            onClick={() => {
              navigate("/doctors");
              window.scrollTo(0, 0);
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow font-medium transition"
          >
            View More Doctors
          </button>
        </div>

      </div>
    </section>
  );
};

export default RelatedDoctors;
