const { default: mongoose } = require('mongoose');
const User = require('../models/User')
const asyncHandler = require('express-async-handler')

 
// @desc Get all users
// @route Get /users
// @acces Private
const getAllUsers = asyncHandler(async (req,res) => {
    console.log("Get users");
     const users = await User.find({}).lean().exec()
     if(!users?.length){
        return res.status(400).json({message:'No users found'})
     }
     console.log("users:",users.length);
     res.json(users)
})

// @desc update a user
// @route PATCH /users
// @acces Private
const updateUser = asyncHandler(async (req,res) => {

    const 
    {
        userId,
        blocName,
        review_id,
        tags,
        set_not_reviewed,
    } = req.body

    // Confir, data
    if(!userId || !blocName || !review_id){
        return res.status(400).json({message:'all fields are required'})
    }

    const userFind = await User.find({"_id":userId}).exec() //enfait cest quand on passe une valeur a find
    
    if (!userFind?.length){

        return res.status(400).json({message:'User not found'})

    } else if (userFind.length > 1){

        return res.status(400).json({message:'Found duplicates (id)'})
    }

    const user = userFind[0]

    if(!user.Journey_Infos.blocs.length) return res.status(400).json({message:`No blocs for user ${user.Discord_Infos.displayName}`})

    const bloc_index = user.Journey_Infos.blocs.findIndex(bloc=>bloc.blocName === blocName)
    
    if(bloc_index < 0) return res.status(400).json({message:`No bloc found with this blocName "${blocName}"`})
    if(!mongoose.Types.ObjectId.isValid(review_id)) return res.status(400).json({message:`Not valid ObjectId ${review_id}`})
    user.Journey_Infos.blocs[bloc_index].reviews.push(new mongoose.Types.ObjectId(review_id));

    if(set_not_reviewed){
        user.Journey_Infos.blocs[bloc_index].reviews = []
        user.Journey_Infos.blocs[bloc_index].reviewed = false;
    }
    user.Student_Perks.tags = tags;
    console.log("saving user...");
    const updatedUser = await user.save()
    console.log("User saved");

    res.json(updatedUser)
})

const getUserByid = asyncHandler(async (req,res) => {
    const {userId} = req.params
    if(!userId) return res.status(400).json({message:'no userId params'})
    if(!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({message:'invalid type'})
    const object_user_id = new mongoose.Types.ObjectId(userId)
    const user = await User.findById(object_user_id)
    if(!user) return res.status(500).json({message:'no user found'})
    return res.json(user)
})

// @desc delete a user
// @route DELETE /users
// @acces Private
const delteUser = asyncHandler(async (req,res) => {

})

module.exports = {
    getAllUsers,
    // createNewUser,
    updateUser,
    getUserByid,
    delteUser,
}