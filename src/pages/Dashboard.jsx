import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import axios from 'axios'
const Dashboard = () => {

  const [alumnos, setAlumnos] = useState("")
  const [grupo, setGrupo] = useState("1°A Tecnologia")
  const [fecha, setFecha] = useState("")
  const [message, setMessage] = useState("")

 async function enviarDatos(){

  if(!alumnos) return;

    setMessage("Registrando...")
    const datos = {
      grupo, alumnos, fecha, 
      nivel: "Secundaria"
    }
      const data = await axios.post("https://backend-asistencia-production.up.railway.app/api/crear",datos,{
        withCredentials:true
      })
      .then(()=>{
        setAlumnos("")
        setMessage("Alumnos registrados correctamente")
      })
      .catch(()=>{
        setMessage("Error al registrar")
      })
  }
  
  return(
    <div className='flex flex-col gap-7 text-center'>
      
      <Navigation titulo="Dashboard" boton={0}/>

      <textarea className='bg-gray-100 text-black min-w-full min-h-40 p-3 text-lg rounded-sm'
      placeholder='Alumnos ausentes' value={alumnos} onChange={(e)=>setAlumnos(e.target.value)} > </textarea>
    <div className='flex justify-evenly'>
      <div>
        <select className='cursor-pointer bg-blue-900 w-40 rounded-sm h-10 text-center' 
              value={grupo}  onChange={(e)=>setGrupo(e.target.value)}
        >
          <option className='bg-gray-700' value="1°A Tecnologia" >1°A Tecnología</option>
          <option className='bg-gray-700' value="2°A Tecnologia" >2°A Tecnología</option>
          <option className='bg-gray-700' value="2°B Tecnologia" >2°B Tecnología</option>
          <option className='bg-gray-900' value="1°A Prepa" >1°A PREPA</option>
          <option className='bg-gray-900' value="3°A Prepa">3°A PREPA</option>
          <option className='bg-gray-900' value="3°B Prepa">3°B PREPA</option>
        </select>
      </div>

      <div>
        <input className="cursor-pointer text-center appearance-none bg-blue-900 w-40 h-10 rounded-sm pl-2 pr-2 text-white"
        type="date" value={fecha} onChange={(e)=>setFecha(e.target.value)} />
      </div>
    </div>
    <div>
      <p className='m-3'>{message}</p>
    <button className='bg-black text-white font-bold w-40 h-12 rounded-full cursor-pointer transition-all hover:shadow-md hover:shadow-blue-800 active:bg-neutral-800'
            onClick={()=>enviarDatos()}
    > Registrar</button>
    </div>
    </div>
  )
}
export default Dashboard