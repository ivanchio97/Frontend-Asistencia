import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {useAuth} from '../hooks/useAuth'
import LoadingBar from '../components/LoadingBar'

const Menu = () =>{
  const {user,loading} = useAuth()
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [message, setMessage] = useState("")
    useEffect(()=>{
    if(user && !loading){
      navigate('dashboard',{replace:true})
    }
  })
  if(loading) return <LoadingBar />

  async function handleLogin(){
    try{
      const response = await axios.post("backend-asistencia-production.up.railway.app/api/login",
        {email,password},
        {withCredentials:true}
      )
      navigate('/dashboard', { replace:true })
    } 
    catch(err){
      setError(err)
      setMessage(err.response.data.mensaje)
    }
  }

  return(
    <div className='flex flex-col items-center gap-8'>
      <h1 className='text-3xl font-bold'>App de asistencia</h1>
      <p className='text-red-700 font-bold text-lg -mb-4 -mt-4'>{message}</p>
      <input type="text" placeholder='Usuario' onChange={(e)=>setEmail(e.target.value)} value={email}
      className='bg-gray-100 rounded-md h-12 w-70 text-black px-3 text-lg ' />

      <input type="password" placeholder='Contraseña' onChange={(e)=>setPassword(e.target.value)} value={password}
      className='bg-gray-100 rounded-md h-12 w-70 text-black px-3 text-lg' />

      <button onClick = {()=>handleLogin()}
      className='bg-black text-white font-bold w-40 h-12 rounded-full cursor-pointer transition-all hover:shadow-md hover:shadow-blue-800 '>
        Iniciar Sesión
      </button>

    </div>
  )
}
export default Menu