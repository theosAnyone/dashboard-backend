const {Schema, model, default: mongoose } = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const adminSchema = new Schema({
    username: {
        type : String,
        required : true,
    },
    password : { 
        type: String,
        required: true,
    },
    active : {
        type : Boolean,
        required : true,
        default:true, 
    },
    role : {
        type: String,
        required: true,
    },
    students: {
        type : [ObjectId],
        ref : 'users'
    },
})

module.exports = model('Admin', adminSchema)