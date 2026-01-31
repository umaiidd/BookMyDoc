import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { availability: !docData.availability });
        return res.status(200).json({ success: true, message: 'Doctor availability changed successfully' });
    } catch (error) {
        console.error('Error changing doctor availability:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email']);
        return res.status(200).json({ success: true, doctors });
    } catch (error) {
        console.error('Error fetching doctors list:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

//API for doctor login
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if (isMatch) {
            const token = jwt.sign({
                id: doctor._id
            }, process.env.JWT_SECRET_KEY)

            res.json({
                success: true,
                token
            })
        } else {
            res.json({
                success: false,
                message: "Invalid Credentials"
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//API to get doctor appointments for Doctor Panel
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.user
        const appointments = await appointmentModel.find({ docId })

        res.json({
            success: true,
            appointments
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//API to mark appointment completed for Doctor Panel
const appointmentComplete = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const { docId } = req.user

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({
                success: true,
                message: "Appointment Completed"
            })
        }
        else {
            return res.json({
                success: false,
                message: "Mark Failed"
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//API to cancel appointment for Doctor Panel
const appointmentCancel = async (req, res) => {
    try {

        const { appointmentId } = req.body
        const { docId } = req.user

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({
                success: true,
                message: "Appointment Cancelled"
            })
        }
        else {
            return res.json({
                success: false,
                message: "Cancellation Failed"
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//API to get dashboard data for Doctor Panel
const doctorDashboard = async (req,res) =>{

try {
    
const {docId} = req.user
const appointments = await appointmentModel.find({docId})

let earnings = 0

appointments.map((item)=>{
if(item.isCompleted || item.payment){
    earnings +=item.amount
}
})
let patients =[]

appointments.map((item)=>{
    if(!patients.includes(item.userId)){
        patients.push(item.userId)
    }
})

const dashData ={
    earnings,
    appointments:appointments.length,
    patients:patients.length,
    latestAppointments:appointments.reverse().slice(0,5)
}

return res.json({
    success:true,
    dashData
})

} catch (error) {
    console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
}

}

//API to get Doctor Profile for Doctor Panel
const doctorProfile = async (req,res)=>{
    try {
        
const {docId} = req.user
const profileData = await doctorModel.findById(docId).select('-password')

return res.json({
    success:true,
    profileData
})

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

//API to Update Doctor Profile data from Doctor Panel
const updateDoctorProfile = async (req,res)=>{
    try {
        
const {docId} = req.user
const {fees,address,available} = req.body

await doctorModel.findByIdAndUpdate(docId, {fees,address,available})

return res.json({
    success:true,
    message:"Profile Updated"
})

    } catch (error) {
       console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' }); 
    }
} 

export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile };
