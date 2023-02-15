import axios from "axios"
import { useRouter } from "next/router";
import { useState } from "react"

export default function Prouct(){
    const router = useRouter();
    
 const[data,setData]=useState({
            productId:router.query._id,
            productName:router.query.Name,
            productImage:router.query.Url,
            productPrice:router.query.Price
})

useEffect(() => {
    
    const token = localStorage.getItem('token') || null;
    if (!token) {
      router.push('/')
    }
  }, []);

const updateData=async event=>{
event.preventDefault()

try{
const response=await axios.put(`http://localhost:3001/product/${data.productId}`,data)
setData({
productId:'',
productImage:'',
productName:'',
productPrice:''

})
router.push("/Product")
}
catch(error){
console.log(error.message)
}
         }

 return(
    <>
    <h1 className="px-96 pt-8 bg-yellow-500">Add or Update Product</h1>

    <form className="pt-20 px-36" onSubmit={updateData}>
  <div className="w-full mb-6  ">
    <div className="px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Product Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Enter Product Name"
     value={data.productName}
     onChange={event=>setData({...data,productName:event.target.value})}
      required
      />
       </div>
    <div className="w-full  px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Product Image Link
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Product Image Link"
      value={data.productImage}
      onChange={event=>setData({...data,productImage:event.target.value})}
      required
      />
    </div>

    <div className="w-full  px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        Price in $
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Price in $"
       value={data.productPrice}
       onChange={event=>setData({...data,productPrice:event.target.value})}
       required
      />
       </div>

  </div>
 <button className="bg-blue-500 w-28 px-11 rounded-md "
  type="submit"
 >Add</button>
</form>
    </>
 )   
}