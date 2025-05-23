// komunikacija sa mongodb-om/ citam/ ubacujem / radims ta god


//registration

// const user = require("../models/User");
const user = require("../server/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 

exports.register = async (req, res)=> {
  try {
    const {name, email, password, country} = req.body; //dekonstrukcija
    const salt=await bcrypt.genSalt(15);
    const cryptedPassword = await bcrypt.hash(password, salt);
    const newUser = new user({name, email, password: cryptedPassword, country});
  
  await newUser.save();

  res.status(201).json({message: "User je registrovan"});
  
  
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "internal error"})
  }
}