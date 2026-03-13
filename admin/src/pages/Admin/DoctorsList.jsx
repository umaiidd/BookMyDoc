import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { aToken, getAllDoctors, doctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="min-h-screen bg-white p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">All Doctors</h1>
          <p className="text-sm text-gray-400 mt-0.5">{doctors.length} doctors registered</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-blue-600">
            {doctors.filter(d => d.available).length} Available
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {doctors.map((item) => (
          <div
            key={item._id}
            className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            {/* Image */}
            <div className="w-full aspect-square bg-blue-50 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Info */}
            <div className="px-3.5 pt-3 pb-3.5">
              <p className="text-sm font-bold text-gray-900 truncate leading-snug">{item.name}</p>
              <p className="text-[11px] font-medium text-blue-500 truncate mt-0.5 mb-3">{item.speciality}</p>

              {/* Availability Button */}
              <button
                onClick={() => changeAvailability(item._id)}
                className={`w-full flex items-center justify-center gap-1.5 py-1.5 rounded-full text-[11px] font-semibold border transition-all duration-200 active:scale-95 ${
                  item.available
                    ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
                    : 'bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                {item.available ? 'Available' : 'Unavailable'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {doctors.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">🩺</span>
          </div>
          <p className="text-gray-700 font-semibold">No doctors yet</p>
          <p className="text-gray-400 text-sm mt-1">Registered doctors will appear here</p>
        </div>
      )}
    </div>
  );
};

export default DoctorsList;