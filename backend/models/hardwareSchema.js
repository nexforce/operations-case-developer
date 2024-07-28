import mongoose from "mongoose";

const hardwareSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    hubspotId: {
        type: String,
        required: false
    }
});

const Hardware = mongoose.model('Hardware', hardwareSchema, 'hardware')
export default Hardware;