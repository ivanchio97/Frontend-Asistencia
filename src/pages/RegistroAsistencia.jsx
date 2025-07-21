import React, { useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import axios from 'axios'
const RegistroAsistencia = () =>{

  const [data, setData] = useState(["Cargando datos..."])
  const [filtereddata, setFilteredData] = useState([])
  const [text, setText] = useState("")
  const [grupo, setGrupo] = useState("")

  useEffect(()=>{
    axios.get("backend-asistencia-production.up.railway.app/api",{ withCredentials: true }).then(res=>{
      setData(res.data)
      setFilteredData(res.data)
      console.log(res.data)
    })
    .catch(err=>{
      console.log("Error al comunicarse con el backend", err)
    })
  },[])

  function buscar(e){
    const valor = e.target.value;
    setText(valor)
    if(!text){
      setFilteredData(data)
    }
    const filtrados = data.filter(elem => elem.alumnos.toLowerCase().includes(text.toLowerCase()))
    setFilteredData(filtrados)
  }
  function filtrarPorGrupo (e){
    const valor = e.target.value;
    setGrupo(valor)
    if(valor == "todos"){
      setFilteredData(data)
    }
    else{
      const filtrados = data.filter(elem => elem.grupo == valor)
      setFilteredData(filtrados)
    }

  }

  return(
    <div className='flex flex-col gap-5'>
      <Navigation titulo="Asistencia" boton={1}/>
      <div className='relative'>
        <input type="text" placeholder='Buscar coincidencias'value={text} onChange={(e)=>buscar(e)}
        className='bg-white h-10 rounded-full text-black px-13 w-full text-lg'
        />
        <p className='absolute top-1/7 left-1/39 text-lg'>🔎</p>
      </div>

      <div className='flex h-10 items-center justify-evenly'>
      <input className="cursor-pointer text-center appearance-none bg-blue-900 w-35 h-10 rounded-sm pl-2 pr-2 text-white"
        type="date" />
        <p className='text-bold'>AL</p>
      <input className="cursor-pointer text-center appearance-none bg-blue-900 w-35 h-10 rounded-sm pl-2 pr-2 text-white"
        type="date" />

      <select className='cursor-pointer bg-red-900 w-40 rounded-sm h-10 text-center'
              value={grupo} onChange={(e)=>filtrarPorGrupo(e)}
      >
          <option className='bg-gray-500' value='todos' >Todos</option>
          <option className='bg-gray-700' value="1°A Tecnologia" >1°A Tecnología</option>
          <option className='bg-gray-700' value="2°A Tecnologia" >2°A Tecnología</option>
          <option className='bg-gray-700' value="2°B Tecnologia" >2°B Tecnología</option>
          <option className='bg-gray-900' value="1°A Prepa" >1°A PREPA</option>
          <option className='bg-gray-900' value="3°A Prepa">3°A PREPA</option>
          <option className='bg-gray-900' value="3°B Prepa">3°B PREPA</option>
        </select>

      </div>

      <div className='max-h-90 overflow-y-auto w-full m-3 rounded-md hide-scrollbar'>
        <table className='w-full'>
          <thead className='bg-neutral-900 h-8 sticky top-0 z-10'>
            <tr>
              <th>Grupo</th>
              <th>Día</th>
              <th>Alumnos</th>
            </tr>
          </thead>
          <tbody>
            {
              filtereddata.map((element)=>{
                return (
                  <tr key={element.id} className='odd:bg-white even:bg-gray-100 text-black' >
                    <td className='py-2 px-4'>{element.grupo}</td>
                    <td className='py-2 px-4'>
                      {new Date(element.fecha).toLocaleDateString('es-MX', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className='py-2 px-4'>{element.alumnos}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </div>
  )
}
export default RegistroAsistencia