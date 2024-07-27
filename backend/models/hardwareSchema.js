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
    }
});

const Hardware = mongoose.model('Hardware', hardwareSchema)
export default Hardware;