import { EmployeeForm } from './components/EmpComponent'
import React from 'react'


import { Route, Routes } from 'react-router-dom';
import {UpdateComponent} from './components/UpdateComponent';
import ShowEmpComponent from './components/ShowEmpComponent';
import Header from './components/Header';


function App() {
  
  return (
   
      <div className='App'>
      <Header></Header>
      <Routes>
        <Route path='/' exact Component={ShowEmpComponent}/>
        <Route path='/add' exact Component={EmployeeForm}/>
        <Route path='/update/:id' exact Component={UpdateComponent}/>
      </Routes>
      </div>
    
  );
}

export default App;
