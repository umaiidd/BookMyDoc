import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const {
    aToken,
    getAllDoctors,
    doctors,
    changeAvailability,
  } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  return (
    <div className="m-6 max-h-[90vh] overflow-y-auto">
      <h1 className="text-xl font-semibold mb-8 text-gray-800">
        All Doctors
      </h1>

      <div className="w-full flex flex-wrap gap-8">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="border border-indigo-200 rounded-2xl max-w-[340px] bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* Image */}
            <div className="h-56 w-full bg-indigo-50">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              <p className="text-xl font-semibold text-gray-800">
                {item.name}
              </p>
              <p className="text-sm text-indigo-600 mb-4">
                {item.speciality}
              </p>

              {/* Availability */}
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  checked={item.availability}
                  onChange={() => changeAvailability(item._id)}
                  className="w-6 h-6 accent-blue-600 cursor-pointer"
                />
                <span className="text-sm font-medium text-gray-700">
                  Available
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;

