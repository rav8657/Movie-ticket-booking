import mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId

const moviesSchema = new mongoose.Schema({
    movieName: {
        'type': String,
        required: true
    },
    theatreId: {
        'type': ObjectId,
        required: "theatreId is required",
        ref: 'theatre',

    },
    showTime: {
        'type': String,
        required: true
    },
    duration: {
        'type': String,
        required: true
    },
    regularSeats: { type: Number, required: true },

    availableRegularSeats: { type: Number, required: true },

    regularPrice: { type: Number, required: true, default: 150 },

    premiumSeats: { type: Number, required: true },

    premiumPrice: { type: Number, required: true, default: 250 },

    availablePremiumSeats: { type: Number, required: true },

});

export default mongoose.model('movies', moviesSchema);