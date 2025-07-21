import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Menu from './pages/Menu'
import Dashboard from './pages/Dashboard';
import RegistroAsistencia from './pages/RegistroAsistencia';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Menu />} />
        <Route element={<ProtectedRoute/>}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='registro-asistencia' element={<RegistroAsistencia />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App;
