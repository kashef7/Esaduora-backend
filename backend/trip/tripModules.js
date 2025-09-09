import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A trip must have a name'],
        maxLength: 100
    },
    description: {
        type: String,
        required: [true, 'A trip must have a description'],
        maxLength: 1000
    },
    price: {
        type: Number,
        required: [true, 'A trip must have a price'],
        min: [0, 'Price must be at least 0']
    },
    photos:{
        type: [String],
        validate: {
            validator: function(arr) {
                return arr.length > 0;
            },
            message: 'A trip must have at least one photo'
        }
    }
});

const Trip = mongoose.model('Trip', tripSchema);

export default Trip;