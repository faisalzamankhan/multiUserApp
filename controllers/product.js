import mongoose from 'mongoose';
import Product from '../models/Product.js';
export default{
    AddProduct:async  (req,res) => {
        try {
          let product=new Product({
            Name:req.body.productName,
            Url:req.body.productImage,
            Price:req.body.productPrice
          });
         
          await product.save();
          
          return res.status(200).json({ success: true, message: "Product Added",data:product });
        } catch (error) {
          console.log(error.message)
          res.status(400).json({ success: false, message: "Something went wrong  ." });
        }
      },

      GetProduct:async  (req,res) => {
        try {
            const product = await Product.find();
         
          
         res.status(200).json({ success: true,data:product });
        } catch (error) {
          console.log(error.message)
          res.status(400).json({ success: false, message: "Something went wrong  ." });
        }
      },  
      UpdateProduct:async  (req,res) => {
        try {
            let id = req.params.id;
            
            
            const product = await Product.findById(id);
         if (!product) {
    return res.status(404).json({ error: 'Product not found' });
                     }
  product.Name =  req.body.productName;
  product.Url = req.body.productImage;
  product.Price=  req.body.productPrice

  product.save() 
         
          
          return res.status(200).json({ success: true,data:product });
        } catch (error) {
     
          res.status(400).json({ success: false, message: "Something went wrong  ." });
        }
      },
      DeleteProduct:async  (req,res) => {
        try {
            const userId = req.params.id;
          const product = await Product.findByIdAndRemove(userId)
          if(!product){
            return res.status(400).send("Product Not found")
          }
          return res.status(200).json({ success: true,data:product });
        } catch (error) {
          res.status(400).json({ success: false, message: "Something went wrong  ." });
        }  
    }
}