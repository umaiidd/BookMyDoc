import validator from 'validator';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import userModel from '../models/userModel.js'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if (!process.env.JWT_SECRET_KEY) {
            throw new Error('JWT_SECRET is not configured');
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
        );

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token
        });

    } catch (error) {
        console.error('Register user error:', error);

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
        else {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_SECRET_KEY,
            );

            res.json({ success: true, token });
        }


    } catch (error) {
        console.log('Login user error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//API to get User Profile data

const getProfile = async (req, res) => {
    try {
        const { userId } = req.user
        const userData = await userModel.findById(userId).select('-password')

        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//API to update User Profile

const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body
        const { userId } = req.user
        const imageFile = req.file

        if (!name || !phone || !address || !dob || !gender) {
            return res.status(400).json({
                success: false,
                message: "Data Missing"
            })
        }

        const updateData = {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender
        }

        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path)
            updateData.image = imageUpload.secure_url
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        )

        res.json({
            success: true,
            message: "Profile Updated",
            user: updatedUser
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

//API to book appointment
const bookAppointment = async (req, res) => {
    try {

        const { docId, slotDate, slotTime } = req.body;
        const { userId } = req.user;

        const docData = await doctorModel.findById(docId).select('-password')

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not Available" })
        }

        let slots_booked = docData.slots_booked

        //Checking for slots availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not Available" })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        }
        else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)

        }


        const userData = await userModel.findById(userId).select('-password');
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })

        res.json({ success: true, message: "Appointment Booked" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })

    }
}

//API to load user Appointments
const listAppointment = async (req, res) => {
    try {

        const { userId } = req.user;
        const appointments = await appointmentModel.find({ userId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

//API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId } = req.user
        const { appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (!appointmentData) {
            return res.json({
                success: false,
                message: "Appointment not found"
            })
        }

        if (appoinmentData.userId !== userId) {
            return res.json({
                success: false,
                message: "Unauthorized Action"
            })
        }

        if (appoinmentData.cancelled) {
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
        const { docId, slotDate, slotTime } = appoinmentData

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
// Api to make payment of Appointment using Razorpay
const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorPay = async (req,res)=> {
    try {
        const {appointmentId} = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if(!appointmentData || appointmentData.cancelled){
        return res.json({
            success:false,
            message:"Appointment Cancelled or not found"
        })
    }

        //Creating options for Razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency:process.env.CURRENCY,
            receipt:appointmentId,
    }

    //Creation of an order
    const order = await razorpayInstance.orders.create(options)
    res.json({
        success:true,
        order
    })

        
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
        
    }
}

//API to verify payment of Razorpay
const verifyRazorpay = async(req,res)=>{
try {

    const {razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    console.log(orderInfo)
    if(orderInfo.status ==='paid'){
        await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
        res.json({
            success:true,
            message:"Payment Successful"
        })
    }
    else{
         res.json({
            success:false,
            message:"Payment Unsuccessful"
        })
    }
} catch (error) {
      console.log(error)
        res.json({
            success: false,
            message: error.message
        })
}
}
    
export {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    bookAppointment,
    listAppointment,
    cancelAppointment,
    paymentRazorPay,
    verifyRazorpay
}