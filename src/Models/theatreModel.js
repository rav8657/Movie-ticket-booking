import mongoose from 'mongoose';

const theatreSchema = new mongoose.Schema({
    name: {
        'type': String,
        required: true
    },
    address: {
        'type': String,
        required: true,
        unique: true
    }

});

export default mongoose.model('theatre', theatreSchema);