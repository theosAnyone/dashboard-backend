const {Schema, model, default: mongoose } = require('mongoose')
const ObjectId = Schema.Types.ObjectId


const reviewSchema = new Schema({
    Teacher:{
        type:ObjectId,
        ref:"teachers",
        require:true,
    },
    User:{
        type:ObjectId,
        ref:"users",
        require:true,
    },
    note:{
        type:Number,
        require:true
    },
    demos:{
        type:[ObjectId],
        require:true,
    },
    tags:{
        type:[String],
        require:true,
    },
    url:{
        type:String,
        require:true,
    }
},
{
    timestamps:true,
})

module.exports = model('Review', reviewSchema,'reviews')
