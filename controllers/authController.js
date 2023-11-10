const Teacher = require('../models/Teacher')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')


// @desc Login 
// @route POST /auth
// @acces Public
const login = asyncHandler(async (req, res) => {
    const {email, password, } = req.body;

    if (!email || !password ) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const foundTeacher = await Teacher.findOne({email}).exec();

    if (!foundTeacher || !foundTeacher.active) {
        return res.status(401).json({message: 'Unauthorized'})
    }

    const match = await bcrypt.compare(password, foundTeacher.password)

    if(!match) return res.status(401).json({message: 'Unauthorized'})

    const accessToken = jwt.sign(
        {
            "TeacherInfo":{
                "email": foundTeacher.email,

                
            },
        },
        process.env.ACCES_TOKEN_SECRET,
        {expiresIn:'15m'} 
    )

    const refreshToken = jwt.sign(
        {"email": foundTeacher.email },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    )

    res.cookie('jwt',refreshToken, {
        httpOnly:true, // accessible by web server
        secure:true, // https
        sameSite:'None', // cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.json({accessToken,teacher:foundTeacher})
})

const signUp = asyncHandler(async (req,res) => {
    const { first_name, last_name, email, password, secret_key } = req.body;
    if(secret_key !== process.env.SECRET_KEY){
        return res.status(400).json({message: "an error occured..."})
    }
    // Confir, data
    if (!first_name || !last_name || !email || !password || !secret_key) {
      return res.status(400).json({ message: "all fields are required" });
    }

    // if(id!== "1234"){
    //     return res.status(400).json({message:'bad id'})
    // }
    // Check for duplicates
    const duplicate = await Teacher.findOne({email}).collation({
        locale:'en',
        strength:2
    }).lean().exec()
    // Allow updates to the original teacher
    if(duplicate ){
        return res.status(409).json({message:'Duplicate email'})
    }

    const hashedPwd = await bcrypt.hash(password, 10) // salt round
    
    const teacherObject = {first_name, last_name, email, "password":hashedPwd}

    //Create and store new teacher
    const teacher = await Teacher.create(teacherObject)
    if(!teacher) return res.status(400).json({message: 'Invalid teacher data received'});

    const accessToken = jwt.sign(
        {
            "TeacherInfo":{
                "email": teacher.email,

                
            },
        },
        process.env.ACCES_TOKEN_SECRET,
        {expiresIn:'15m'} 
    )

    const refreshToken = jwt.sign(
        {"email": teacher.email },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    )

    res.cookie('jwt',refreshToken, {
        httpOnly:true, // accessible by web server
        secure:true, // https
        sameSite:'None', // cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    res.json({accessToken,teacher_id:teacher._id})


})

const refresh = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ message:'Unauthorized'})

    const refreshToken = cookies.jwt

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) return res.status(403).json({ message:'Forbidden'})

            const foundTeacher = await Teacher.findOne({ email: decoded.email})
            console.log("foundTeacher:",foundTeacher);
            if(!foundTeacher) return res.status(401).json({ message:'Unauthorized'})

            const accessToken = jwt.sign(
                {
                    "TeacherInfo":{
                        "email":foundTeacher.email,

                    }
                },
                process.env.ACCES_TOKEN_SECRET,
                { expiresIn:'15m'}
            )

            res.json({ accessToken,teacher_id:foundTeacher._id })
        })
    )
}

const logout = (req, res) => {
    const cookies = req.cookies

    if(!cookies?.jwt) return res.sendStatus(204) //No content
    res.clearCookie('jwt',{httpOnly:true, sameSite: 'None', secure: true})
    res.json({ message: 'Cookie cleared'})
}

module.exports = {
    login,
    signUp,
    refresh,
    logout,
}