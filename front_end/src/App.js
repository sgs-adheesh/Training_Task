import {EmployeeForm} from './EmpComponent'
import './Emp.css';
import ShowEmpComponent from './ShowEmpComponent';


function App() {
  return (
    <div className="App">
      <h1>Employee Registration Form</h1>
      <EmployeeForm/>
      <ShowEmpComponent/>

    </div>
  );
}

export default App;
