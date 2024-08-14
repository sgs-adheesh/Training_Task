import React, { useState } from 'react'
import './ShowEmp.css'
function ShowEmpComponent() {

    const[records,setRecords]=useState([])
    //const [showTable, setShowTable] = useState(false);

    const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:8001/employee');
          const result = await response.json();
          setRecords(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const handleShowTable = () => {
        fetchData();
        //setShowTable(true);
      };

    
  return (
    <div>
        <button onClick={handleShowTable}>Show All Employees</button>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item,index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.department}</td>
              <td>{item.designation}</td>
              <td>{item.salary}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ShowEmpComponent