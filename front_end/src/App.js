import { EmployeeForm } from './component/EmpComponent'
import React, { useState } from 'react'
import ShowEmpComponent from './component/ShowEmpComponent';


function App() {
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      <br></br>
      <button style={{backgroundColor:'blue'}}onClick={() => setShow(!show)}>{show ? "SHOW details" : "ADD employee"}</button>
      {show ? <EmployeeForm /> : <ShowEmpComponent />}

    </div>
  );
}

export default App;
