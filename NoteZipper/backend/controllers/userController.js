
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/genarateToken");
// const cloudinary = require("../utils/cloudinary")


const registerUser = asyncHandler(async (req, res) => {
  
  const { name, email, password, pic } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  // const result =  await cloudinary.uploader.upload(pic,{
  
  //   folder:profilepics,

  // })
  const user = await User.create({
    name,
    email,
    password,
    pic
    // {
    //   user_id:result.user_id,
    //   url:result,secure_url
    // },
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token:generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!");
  }

  res.json({
    name,
    email,
    password,
    pic,
  });
});



const authUser = asyncHandler(async (req, res) => {
    const { email, password} = req.body;

   
  const user = await User.findOne({ email });
  
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
       pic: user.pic,
      token:generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
  });





module.exports = {registerUser,authUser};