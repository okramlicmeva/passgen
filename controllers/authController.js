// komunikacija sa mongodb-om/ citam/ ubacujem / radims ta god


//registration

// const user = require("../models/User");
const user = require("../server/models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const User = require("../server/models/User");

exports.register = async (req, res)=> {
  try {
    const {name, email, password, country} = req.body; 
//test novog 
    const existingUser = await user.findOne({email});
    if (existingUser) {
      return res.status(400).json({message: "Email Already Exists!"});
    }

//test novog

    const salt=await bcrypt.genSalt(15);
    const cryptedPassword = await bcrypt.hash(password, salt);
    const newUser = new user({name, email, password: cryptedPassword, country});
  
  await newUser.save();

  res.status(201).json({message: "User je registrovan"});
  
  
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "internal error vec postoji"})
  }
};
//tokeni

exports.login = async (req, res)=> {

  try{
const {email, password} = req.body;
console.log("sifra iz proklete forme:", password);
const user = await User.findOne({email});
console.log("nasli smo uesra", user)
if(!user) return res.status(400).json({message: "User not found"});

const matchingData = await bcrypt.compare(password, user.password);
console.log("sifra se poklapa", matchingData);
if(!matchingData) return res.status(400).json({message:"Invalid credentials"});

//jwt potpisivanja
const token = jwt.sign({id:user._id, email:user.email, name:user.name}, process.env.JWT_SECRET, {expiresIn:"1d"});
res.json({token});


  } catch(err) {
    res.status(500).json(err);
  }



};

//checking token / user existance
exports.check= async(req,res)=>{

try{
  console.log("check route hit") //provera rute
  console.log("req.user:", req.user); //provera dekodiranog tokena
  const user= await User.findById(req.user.id);
  if(!user) return res.status(404).json({message: "User not found"});
  res.json({name: user.name, email: user.email});
}

catch (err){
  console.error("error:", err);
  res.status(500).json({message: "Server error"});

}

}

exports.logout=(req,res)=>{

  try{
  res.cookie("token", "", {expires:new Date(0), httpOnly:true});
  res.json({message:"Usesno ste se izlogovali"});
  }
  catch(e){
    res.status(500).json({message: "server error"});
  }
}