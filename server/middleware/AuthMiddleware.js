const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {

  const token = req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  console.log("Received token:", token);
  if(!token) return res.status(401).json("Access Denied");
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log(verified);
    next();
  } catch(err){
    res.status(400).json("Invalid Token");
  }


};