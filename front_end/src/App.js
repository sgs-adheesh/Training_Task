import { EmployeeForm } from './components/EmpComponent'
import React from 'react'


import { Route, Routes } from 'react-router-dom';
import {UpdateComponent} from './components/UpdateComponent';
import ShowEmpComponent from './components/ShowEmpComponent';


function App() {
  
  return (
   
      <div className='App'>
      <Routes>
        <Route path='/' exact Component={EmployeeForm}/>
        <Route path='/show' exact Component={ShowEmpComponent}/>
        <Route path='/update/:id' exact Component={UpdateComponent}/>
      </Routes>
      </div>
    
  );
}

export default App;
