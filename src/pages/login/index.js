import { useState } from "react"
import axios from 'axios';
import { useRouter } from "next/router";

export default function Index(){
  const router=useRouter()
const [data,setData]=useState({
  Email:'',
  Password:'',
 
})

const [error,setError]=useState(false)

const login=async (event)=>{
  event.preventDefault()
let param={
  Email:data.Email,
  Password:data.Password,
  isAdmin:true
} 
try{
const response = await axios.post(`http://localhost:3001/login`, param);
localStorage.setItem('token',response.data.data.token)
setData({
  Email:'',
  Password:''
})
router.push("/Product")
}

catch(error)
{
  setError(true)
  setData({
    Email:'',
    Password:''
  })
}


}
return(
<>
<div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
        </div>
        <h3 className="text-2xl font-bold text-center">Login to your account</h3>
         <form onSubmit={login}>
         <div className="mt-4">
                <div>
                    <label className="block" >Email</label>
                            <input type="text" placeholder="Email"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600" 
                                value={data.Email}
                                onChange={e=>setData({...data,Email:e.target.value})}
                                required
                                />
                            
                            </div>
                <div className="mt-4">
                    <label className="block">Password</label>
                            <input type="password" placeholder="Password"
                                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                                value={data.Password}
                                onChange={e=>setData({...data,Password:e.target.value})}
                                required
                                />
                             {error?    
                            <span className="text-xs tracking-wide text-red-600">Email and Password is incorrect </span>
                            :''}    
                </div>
                <div className="flex items-baseline justify-between">
                    <button className="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                     type="submit"
                    >Login</button>
                    <a href="/changePassword/reset" className="text-sm text-blue-600 hover:underline">Forgot password?</a>
                                  </div>
                
            </div>
          
          </form >   
            
   
    </div>
</div>
</>
 ) 
}