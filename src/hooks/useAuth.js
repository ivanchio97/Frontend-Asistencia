import React,{useState, useEffect} from 'react'
import axios from 'axios'

export function useAuth(){
 const [user, setUser] = useState(null)
 const [loading, setLoading] = useState(true)

 useEffect(()=>{
  axios.get("http://localhost:4000/api/protectedroute",{withCredentials:true})
  .then(res=>{
    setUser(res.data.usuario)
    
  })
  .catch(()=>{
    setUser(null)
    console.log("error al intentar hacer fetch")
  })
  .finally(()=>setLoading(false))
 },[])
 return {user, loading}
}