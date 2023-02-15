import User from '../models/User.js';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import  jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'

// for outlook //
let transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  service: "outlook", // service name
  secureConnection: false,
  tls: {
    ciphers: "SSLv3", // tls version
  },
  port: 587, // port
  auth: {
    user: process.env.Email,
    pass: process.env.PASS,
  },
});
export default{
  signup:async  (req,res) => {
        try {
        
          let user =await User.findOne({Email:req.body.Email})
          if(user) return res.status(400).send("User already registered.")
          user=new User({
            Name:req.body.Name,
            Email:req.body.Email,
            Password:req.body.Password,
            isAdmin:true
          });
          const salt =await bcrypt.genSalt(10);
          user.Password =await bcrypt.hash(user.Password,salt)  
          await user.save();
          
          const token=user.generateAuthToken()
          const data ={
            token: token,
            Name:user.Name,
            Email:user.Email,
            isAdmin:user.isAdmin
          }
          return res.header('x-auth-token',token).json({ success: true, message: "Successful Register",data:data });
        } catch (error) {
          console.log(error.message)
          res.status(400).json({ success: false, message: "Something went wrong  ." });
        }
      },

  login:async  (req,res) => {
    
    try {
      console.log(req.body.Email)
      let user =await User.findOne({Email:req.body.Email})
      if(!user) return res.status(400).json({success: false, message: "Invalid email or password" })
      
      const validPassword= await bcrypt.compare(req.body.Password,user.Password)
      if(!validPassword) return res.status(400).send('Invalid email or password')
      
      const token=jwt.sign({_id:user._id},process.env.JWT_SECRET);
      const data ={
        token: token,
        Name:user.Name,
        Email:user.Email,
        isAdmin:user.isAdmin
      }
      res.status(200).json({ success:true, data:data })
    
    } catch (error) {
      res.status(400).json({ success: false, message: "Something went wrong." });
    }
  },

  forgotPassword:async(req,res)=>{
    try{
      console.log(req.body)
      console.log(process.env.PASS)
      const userdata = await User.findOne({Email:req.body.Email})
      if(!userdata) res.status(404).json({status:false,message:'email not found'})
         const link = process.env.LOCAL_URL + `changePassword/?id=${userdata._id}`;
          var mailOptions = {
            from: process.env.Email,
            to:userdata.Email,
            subject: "Change Password Link",
            html:
              "<h3 style='color:black;' >To Change Password Please Click on below link</h3>" +
              "<a style='font-weight:bold;' href='" +
              link +
              "'> " +
              link +
              "</a>",
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              return res.status(500).json({
                status: false,
                message: "Internal server error",
              });
            } else {
              console.log("Email sent: " + info.response);
              return res.status(200).json({
                status: true,
                message: "Email sent successfully",
              });
            }
          });

    } catch(error){
      console.log(error.message)
      res.status(500).json({status:false,message:error.message})
    }
  },



  changePassword:async(req,res)=>{
    try{
    // const id = mongoose.Types.Schema(req.body.id)
    const salt =await bcrypt.genSalt(10);
    const Password =await bcrypt.hash(req.body.Password,salt) 
    const id=(req.body.id)
    
    try{
      const users = User.findOneAndUpdate({_id:id},{
        Password:Password
      },{new:true}, (err, doc) => {
        if (err) return console.error(err);
        console.log(doc);
        res.status(200).json({status:true,message:"Password updated Sucessfully"})
      })
      
    } catch(error){
      res.status(400).json({status:false,message:error.message})
    }
  }catch(error){
      res.status(500).json({status:false,message:error.message})
  }
  }




}