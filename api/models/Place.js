import mongoose from 'mongoose';

const PlaceSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuest: Number,
    price : Number,
});

console.log('Registering Place schema');
const Place = mongoose.model('Place', PlaceSchema);

export default Place;
