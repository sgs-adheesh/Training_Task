import { EmployeeForm } from './component/EmpComponent'
import React, { useState } from 'react'
import ShowEmpComponent from './component/ShowEmpComponent';


function App() {
  const [show, setShow] = useState(true)
  return (
    <div className="App">
      <br></br>
      <button onClick={() => setShow(!show)}>{show ? "SHOW" : "ADD"}</button>
      {show ? <EmployeeForm /> : <ShowEmpComponent />}

    </div>
  );
}

export default App;
