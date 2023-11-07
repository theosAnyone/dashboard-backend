const { Schema, model, default: mongoose } = require("mongoose");
const objectId = Schema.Types.ObjectId;
const pause = new Schema({
  is_paused:{
    type:Boolean,
    default:false,
    required:true,
  },
  pause_date:{
    type:Date,
    default:Date.now,
    required:true,
  }
})
const exercice = new Schema({
  numberName:{
    type:String,

  },
  instructions:{
    type:String,
    
  },
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  note: {
    type: Number,
  },
});
const uvpSchema = new Schema({
  teacher: {
    type: objectId,
    ref: "teachers",
    required: true,
  },
  uvp: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const agencyAdmissibleSchema = new Schema({
  teacher: {
    type: objectId,
    ref: "teachers",
    required: true,
  },
  admissible: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const advisedAgencySchema = new Schema({
  teacher: {
    type: objectId,
    ref: "teachers",
    required: true,
  },
  advisedAgency: {
    type: [String],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const goldSchema = new Schema({
  teacher: {
    type: objectId,
    ref: "teachers",
    required: true,
  },
  gold: {
    type: Boolean,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// const reviewSchema = new Schema({
//   reviewed: {
//     type: Boolean,
//     default: false,
//   },
//   reviewedBy: {
//     type: objectId,
//     ref: "teachers",
//   },
//   reviewVocal: {
//     type: String,
//   },
//   reviewNote: {
//     type: Number,
//   },
//   reviewDate: {
//     type: Date,
//   },
// });
// const blocSchema = new Schema({
//   blocName: {
//     type: String,
//     required: true,
//   },
//   exercices: {
//     type: [exercice],
//     default:[],
//   },
//   completed: {
//     type: Boolean,
//     default: false,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   review: {
//     type: reviewSchema,
//     default: { reviewed: false },
//   },
// });
const blocSchema = new Schema({
  blocName: {
    type: String,
    required: true,
  },
  exercices: {
    type: [exercice],
    default:[],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  reviewed: {
    type: Boolean,
    default: false,
  },
  reviews: {
    type: [objectId],
    ref: "reviews"
  }
});


const Discord_Infos = new Schema({
  discordId: {
    type: String,
    required: true,
    unique: true,
  },
  privateSpaceId: {
    type: String,
    required: true,
    unique: true,
  },
  grade:{
    type:String,
    required:true,
  },
  username: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  avatar_url : {
    type:String,
    default:"https://archive.org/download/discordprofilepictures/discordblue.png"
  },
})
const User_Infos = new Schema({
  name:{
    type:String,
    default:'', 
  },
  age:{
    type:Number,
    default:0,
  },
})
const Journey_Infos = new Schema({
  start:{
    type:Date,
    required:true,
  },
  pause:{
    type:pause,
    default:{
    }
  },
  end:{
    type:Date
  },
  progress: {
    type: Number,
    default: -1,
  },
  blocs: {
    type: [blocSchema],
    default:[]
  },
  pdf: {
    type: String,
    default:'',
  },

})
const Student_Perks = new Schema({
  uvps: {
    type: [uvpSchema],
    default:[],
  },
  agencyAdmissibles: {
    type: [agencyAdmissibleSchema],
    default:[],
  },
  advisedAgencys: {
    type: [advisedAgencySchema],
    default:[]
  },
  golds: {
    type: [goldSchema],
    default:[]
  },
})


const UserSchema = new Schema({
  User_Infos:{
    type:User_Infos,
    rquired:true,
    default:{},
  },
  Discord_Infos:{
    type:Discord_Infos,
    required:true,
    default:{},
  },
  Journey_Infos:{
    type:Journey_Infos,
    required:true,
    default:{},
  },
  Student_Perks:{
    type:Student_Perks,
    required:true,
    default:{},
  }
});

module.exports = model("users", UserSchema, "users");
