const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_STRING_DIS)
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;