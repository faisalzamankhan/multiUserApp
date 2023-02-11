import mongoose from 'mongoose';
import  jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
    Name:{
      type:String,
      require:true
    },
    Email: {
      type: String,
      unique: false,
      maxlength: [100, 'Username cannot be more than 100 characters'],
    },
    Password: {
        type: String,
        unique: false,
        maxlength: [100, 'Password cannot be more than 100 characters'],
      },
    isAdmin:{
      type:Boolean
    }  
    })

    UserSchema.methods.generateAuthToken=function(){
      const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},process.env.JWT_SECRET);
      return token    
    }


    export default mongoose.model('User', UserSchema);    