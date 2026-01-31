import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';



const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null); // ✅ Start with null, not false
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [experience, setExperience] = useState(1);
  const [fees, setFees] = useState(0);
  const [about, setAbout] = useState('');
  const [speciality, setSpeciality] = useState('General Physician');
  const [degree, setDegree] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');

  const {backendUrl, aToken} = useContext(AdminContext);

const onSubmitHandler = async (e) => {
  e.preventDefault();
  // In AddDoctor.jsx, inside onSubmitHandler

  try {
    
    if (!docImg) {
      return toast.error("Please upload Doctor's image");
    }

    const formData = new FormData();

    formData.append('image', docImg);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('experience', experience);
    formData.append('fees', Number(fees));
    formData.append('about', about);
    formData.append('speciality', speciality);
    formData.append('degree', degree);
    formData.append(
      'address',
      JSON.stringify({ line1: address1, line2: address2 })
    );
    // In AddDoctor.jsx, inside onSubmitHandler
console.log('Sending formData:', {
  name,
  email,
  experience,
  fees,
  speciality,
  degree,
  address: { line1: address1, line2: address2 },
  hasImage: !!docImg
});

// Also log the full FormData (tricky, but doable)
for (let [key, value] of formData.entries()) {
  console.log(key, value);
}

    const { data } = await axios.post(
      backendUrl + '/api/admin/add-doctor',
      formData,
      { headers: { aToken } }
    );

    if (data.success) {
      toast.success(data.message);
      setDocImg(null);
      setName('');
      setEmail('');
      setPassword('');
      setExperience(1);
      setFees(0);
      setAbout('');
      setSpeciality('General Physician');
      setDegree('');
      setAddress1('');
      setAddress2('');
    } else {
      toast.error(data.message);
    }
  } catch (err) {
    console.error("Error in form submission:", err);
    toast.error(err.response?.data?.message || "Something went wrong");
  }
};


  return (
    <div className="min-h-screen bg-gray-50 py-10">
      {/* Page Title */}
      <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8"> {/* ✅ fixed mx-30 → mx-auto */}

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Add Doctor
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
            Create a new doctor profile for seamless appointment booking
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <form onSubmit={onSubmitHandler} className="p-6 sm:p-8 space-y-8">

            {/* ✅ FIXED UPLOAD SECTION */}
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <label
                htmlFor="doc-img"
                className="cursor-pointer w-28 h-28 flex items-center justify-center
                           border-2 border-dashed border-gray-300 rounded-full bg-gray-50
                           hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 relative overflow-hidden"
              >
                {docImg ? (
                  <img
                    src={URL.createObjectURL(docImg)}
                    alt="Doctor preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <img
                    src={assets.upload_area}
                    alt="Upload icon"
                    className="w-10 text-gray-400"
                  />
                )}
                <input
                  type="file"
                  id="doc-img"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      setDocImg(e.target.files[0]);
                    }
                  }}
                />
              </label>

              <div className="text-center sm:text-left">
                <p className="text-sm font-medium text-gray-700">
                  Doctor Profile Picture
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Upload a clear, professional photo (JPG/PNG, max 2MB)
                </p>
              </div>
            </div>

            {/* Rest of form — unchanged, but connect state if needed */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
              {/* Left Column */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Full Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="e.g. Dr. Sarah Johnson"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition shadow-sm hover:shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="doctor@example.com"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition shadow-sm hover:shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Password
                  </label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition shadow-sm hover:shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Experience
                    </label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(Number(e.target.value))}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition shadow-sm hover:shadow-sm appearance-none bg-white"
                    >
                      {Array.from({ length: 20 }, (_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1} Year{i !== 0 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Consultation Fee ($)
                    </label>
                    <input
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                      type="number"
                      min="0"
                      placeholder="e.g. 100"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 transition shadow-sm hover:shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Speciality
                  </label>
                  <select
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition shadow-sm hover:shadow-sm appearance-none bg-white"
                  >
                    <option>General Physician</option>
                    <option>Gynaecologist</option>
                    <option>Dermatologist</option>
                    <option>Pediatrician</option>
                    <option>Neurologist</option>
                    <option>Gastroenterologist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Education & Qualifications
                  </label>
                  <input
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    type="text"
                    placeholder="e.g. MBBS, MD in Cardiology"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition shadow-sm hover:shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Address
                  </label>
                  <input
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    type="text"
                    placeholder="Street address"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm mb-3
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition shadow-sm hover:shadow-sm"
                  />
                  <input
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    type="text"
                    placeholder="City, State, ZIP"
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm
                               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                               transition shadow-sm hover:shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* About Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                About the Doctor
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows={4}
                placeholder="Briefly describe the doctor's expertise, approach, and experience..."
                required
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm resize-none
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           transition shadow-sm hover:shadow-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 
                           text-white px-8 py-3 rounded-lg text-sm font-semibold
                           hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200
                           shadow-md hover:shadow-lg"
              >
                Add Doctor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;