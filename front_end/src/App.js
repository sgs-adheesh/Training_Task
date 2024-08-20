import {EmployeeForm} from './EmpComponent'
//import './Emp.css';
import ShowEmpComponent from './ShowEmpComponent';


function App() {
  return (
    <div className="App">
     <h1 className="text-3xl font-bold underline">Employee Registration Form</h1>
      <EmployeeForm/>
      <ShowEmpComponent/>

    </div>
  );
}

export default App;
