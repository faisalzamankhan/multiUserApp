import mongoose from 'mongoose';
import  jwt from 'jsonwebtoken';
const productSchema = new mongoose.Schema({
    Name:{
      type:String,
      require:true
    },
    Url:{
      type:String,
      require:true
    } ,
    Price:{
      type:String,
      require:true
    } 
    })

export default mongoose.model('Product', productSchema);    