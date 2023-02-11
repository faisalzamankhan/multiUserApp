import mongoose from 'mongoose';
import  jwt from 'jsonwebtoken';
const productSchema = new mongoose.Schema({
    name:{
      type:String,
      require:true
    },
    category:{
      type:String,
      require:true
    } 
    })

export default mongoose.model('Product', productSchema);    