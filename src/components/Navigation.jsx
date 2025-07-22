import React, { useState } from 'react'
import avatar from '/public/avatar.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Navigation = ({titulo, boton}) => {

  const navigate = useNavigate()
  const [openOptions, setOpenOptions] = useState(false)
  function handleOpen(){
    setOpenOptions( prev => !prev )
  }
  function handleGo(boton){
    if(boton == 0) navigate('/registro-asistencia')
    else navigate('/dashboard')
  }
  async function cerrarSesion () {
    const res = await axios.post("https://backend-asistencia-production.up.railway.app/api/logout",{},{withCredentials: true})
    .then(()=>{
      console.log("Sesión cerrada")
      navigate("/", { replace:true })
    })
    .catch(()=>{
      console.log("Error al cerrar sesión")
    })
  }
  return(
    <nav className=' flex justify-between h-10 items-center relative lg:justify-evenly' >
      <h1 className='text-3xl font-bold'
      >{titulo}</h1>
      <button className='cursor-pointer bg-blue-800 w-30 h-10 rounded-sm font-bold hover:bg-blue-900' onClick={()=>handleGo(boton)} >
        {boton == 0 ? "Ver registro" : "Dashboard"}
      </button>
      <img src={avatar} alt="profile-photo" className='cursor-pointer h-full' onClick={handleOpen} />

      { openOptions &&
        (
          <ul className='absolute top-12 right-0 flex flex-col h-21 justify-evenly bg-gray-100 text-black w-35 rounded-sm border border-gray-500 shadow-md py-1 items-center z-100 '
          >
            <li className='cursor-pointer hover:bg-gray-400 h-8 leading-8 w-full text-center '
             > ⚙️ Configración</li>
            <li className='cursor-pointer hover:bg-gray-400 h-8 leading-8 w-full text-center' 
             onClick={()=>cerrarSesion()}  > 
            ❌ Cerrar sesión</li>
          </ul>
        )
      }

    </nav>
  )
}
export default Navigation