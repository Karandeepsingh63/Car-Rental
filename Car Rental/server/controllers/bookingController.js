import Booking from "../models/Booking.js"
import Car from "../models/Car.js";


// yeh function car ki availability check karta hai  
const checkAvailability = async (car, pickupDate, returnDate)=>{

    // database me check karega koi booking overlap to nahi ho rahi 
    const bookings = await Booking.find({
        car,
        pickupDate: {$lte: returnDate},     // pickupDate returnDate se chhota hona chahiye 
        returnDate: {$gte: pickupDate},    // returnDate pickup se bada hona chahiye 
    })
    
    return bookings.length === 0; // agar 0 booking hai means availablhe hai voh
}



// API: car availability check karne ke liye 
export const checkAvailabilityOfCar = async (req, res)=>{
    try {

        const {location, pickupDate, returnDate} = req.body 

        // location ke hisab se saari cars le aao 
        const cars = await Car.find({location, isAvaliable: true})

        // har car ko asynchronously check kr rhe hai ithe
        const availableCarsPromises = cars.map(async (car)=>{

            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)

            
            return {...car._doc, isAvailable: isAvailable}
        })

        let availableCars = await Promise.all(availableCarsPromises);

        // sirf available cars filter kar li 
        availableCars = availableCars.filter(car => car.isAvailable === true)

        res.json({success: true, availableCars})

    } catch (error) {
        console.log(error.message);  
        res.json({success: false, message: error.message})
    }
}



// API: Booking create 
export const createBooking = async (req, res)=>{
    try {

        const {_id} = req.user; 
        const {car, pickupDate, returnDate} = req.body;

        // pehle availability check
        const isAvailable = await checkAvailability(car, pickupDate, returnDate)

        if(!isAvailable){
            return res.json({success: false, message: "Car is not available"}) 
        }

        const carData = await Car.findById(car) 


        
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);

        // total days nikal liya 
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))

        const price = carData.pricePerDay * noOfDays; 


        // booking create
        await Booking.create({car, owner: carData.owner, user: _id, pickupDate, returnDate, price})

        res.json({success: true, message: "Booking Created"}) // booking ho gayi 

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}



// API: user ki bookings lane ke liye 
export const getUserBookings = async (req, res)=>{
    try {

        const {_id} = req.user;

        // populate ka matlab car ka data bhi laao
        const bookings = await Booking.find({ user: _id }).populate("car").sort({createdAt: -1})

        res.json({success: true, bookings})

    } catch (error) {
        console.log(error.message); 
        res.json({success: false, message: error.message})
    }
}



// API: owner ki sab bookings 
export const getOwnerBookings = async (req, res)=>{
    try {

        
        if(req.user.role !== 'owner'){
            return res.json({ success: false, message: "Unauthorized" })
        }

        
        const bookings = await Booking.find({owner: req.user._id})
            .populate('car user')
            .select("-user.password")
            .sort({createdAt: -1 })

        res.json({success: true, bookings})

    } catch (error) {
        console.log(error.message);  
        res.json({success: false, message: error.message})
    }
}



// API: booking status change karna )
export const changeBookingStatus = async (req, res)=>{
    try {

        const {_id} = req.user;
        const {bookingId, status} = req.body 

        const booking = await Booking.findById(bookingId)

        // ensure karo owner hi change kare 
        if(booking.owner.toString() !== _id.toString()){
            return res.json({ success: false, message: "Unauthorized"})
        }

        booking.status = status; 
        await booking.save();

        res.json({ success: true, message: "Status Updated"})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}
