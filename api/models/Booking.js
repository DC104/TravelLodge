import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place', 
        required: true
    },
    user: {type:mongoose.Schema.Types.ObjectId , required:true},
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    
    name: { type: String },
    phone: { type: String, required: true },
    price: { type: Number }
});

const BookingModel = mongoose.model('Booking', bookingSchema);

export default BookingModel;
