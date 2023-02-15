import product from '../controllers/product.js'
import express from "express";



var router = express.Router();
/* GET users listing. */
router.post('',product.AddProduct);
router.get('',product.GetProduct);
router.put('/:id',product.UpdateProduct);
router.delete('/:id',product.DeleteProduct);


// router.post('/login/users',user.onGetAllUser)

export default router;