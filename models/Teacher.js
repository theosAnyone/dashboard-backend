const {Schema, model, default: mongoose } = require('mongoose')
const ObjectId = Schema.Types.ObjectId


const teacherSchema = new Schema({
    first_name: {
        type: String,
        required:true,
    },
    last_name: {
        type: String,
        required:true,
    },
    anyone_profile : {
        type: String,
    },
    email: {
        type : String,
        required : true,
    },
    password : {
        type: String,
        required: true,
    },
    active : {
        type : Boolean,
        default:true, 
    },
    reviews : {
        type: [ObjectId],
        ref:"reviews",
    }
})

module.exports = model('Teacher', teacherSchema)
