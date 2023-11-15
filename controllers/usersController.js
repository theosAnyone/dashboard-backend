const User = require('../models/User')
const asyncHandler = require('express-async-handler')

 
// @desc Get all users
// @route Get /users
// @acces Private
const getAllUsers = asyncHandler(async (req,res) => {
    console.log("Get users");
     const users = await User.find().lean().exec() // .select('-password') pour ne pas retourner le mot de pass. lean() pour ne pas recevoir un document mongoose avec ses methodes (Save etc...) simplement de la data json.
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
    
    user.Journey_Infos.blocs[bloc_index].reviews.push(review_id);

    if(set_not_reviewed){
        user.Journey_Infos.blocs[bloc_index].reviews = []
        user.Journey_Infos.blocs[bloc_index].reviewed = false;
    }
    user.Student_Perks.tags = tags;
    console.log("user:",user);
    const updatedUser = await user.save()

    res.json(updatedUser)
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
    delteUser,
}