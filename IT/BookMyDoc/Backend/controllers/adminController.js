import validator from 'validator';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import Doctor from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';

// API for adding doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address
    } = req.body;

    const imageFile = req.file;

    // 1. Check required fields
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required to add a doctor.'
      });
    }

    // 2. Validate email
    const normalizedEmail = email.toLowerCase().trim();
    if (!validator.isEmail(normalizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address.'
      });
    }

    // 3. Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email: normalizedEmail });
    if (existingDoctor) {
      return res.status(409).json({
        success: false,
        message: 'A doctor with this email already exists.'
      });
    }

    // 4. Validate strong password
    const isStrong = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    });

    if (!isStrong) {
      return res.status(400).json({
        success: false,
        message:
          'Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.'
      });
    }

    // 5. Validate numeric fields
    if (isNaN(fees) || fees < 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid fees value.'
      });
    }

    // 6. Parse address safely
    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch {
      return res.status(400).json({
        success: false,
        message: 'Invalid address format.'
      });
    }

    // 7. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 8. Upload image to Cloudinary
    let imageUrl;
    try {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: 'image'
      });
      imageUrl = uploadResult.secure_url;
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: 'Image upload failed.'
      });
    }

    // 9. Create doctor data
    const doctorData = {
      name,
      email: normalizedEmail,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees: Number(fees),
      address: parsedAddress,
      date: Date.now()
    };

    // 10. Save to database
    const newDoctor = new Doctor(doctorData);
    await newDoctor.save();

    return res.status(201).json({
      success: true,
      message: 'Doctor added successfully.',
      doctor: newDoctor
    });

 } catch (error) {
  console.error('ADD DOCTOR ERROR:', error);
  return res.status(500).json({
    success: false,
    message: error.message
  });
}

};

//API for admin login
const loginAdmin = async (req, res) => {
  // Implementation for admin login
  try {
    const {email, password} = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const token = jwt.sign(email+password, process.env.JWT_SECRET_KEY);
    res.json({
      success: true,
      message: 'Admin logged in successfully',
      token: token
    });
    } else {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }
  } catch (error) {
    console.error('ADMIN LOGIN ERROR:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

// API to get all doctors list for Admin panel
const allDoctors = async (req, res) => {
  try {
   const doctors = await doctorModel.find({}).select('-password')
    return res.status(200).json({
      success: true,
      doctors: doctors
    });
  } catch (error) {
    console.error('GET ALL DOCTORS ERROR:', error);
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//API to get all appointments list
const appointmentsAdmin = async (req,res) => {
  try {
    
const appointments = await appointmentModel.find({})
res.json({
  success:true,
  appointments
})

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

//Api to cancel appointment for Admin
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.json({
                success: false,
                message: "Appointment not found"
            })
        }

        if (appointmentData.cancelled) {
            return res.json({
                success: false,
                message: "Appointment already cancelled"
            })
        }

        await appointmentModel.findByIdAndUpdate(
            appointmentId,
            { cancelled: true }
        )

        // Releasing doctor slot
        const { docId, slotDate, slotTime } = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked || {}

        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(
                e => e !== slotTime
            )

            // Remove empty date key
            if (slots_booked[slotDate].length === 0) {
                delete slots_booked[slotDate]
            }
        }

        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({
            success: true,
            message: "Appointment Cancelled"
        })
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//Api to get dashboard data for admin panel
const adminDashboard = async (req,res)=>{
  try {
    
const doctors = await doctorModel.find({})
const users = await userModel.find({})
const appointments = await appointmentModel.find({})

const dashData = {
  doctors: doctors.length,
  appointments:appointments.length,
  patients:users.length,
  latestAppointments:appointments.reverse().slice(0,5)
}

res.json({
  success:true,
  dashData
})

  } catch (error) {
    console.log(error)
        res.json({
            success: false,
            message: error.message
        })
  }
}

export { addDoctor, loginAdmin, allDoctors,appointmentsAdmin, appointmentCancel, adminDashboard };
