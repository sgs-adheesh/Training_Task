import React, { useState } from 'react'
import '../ShowEmp.css'
import axios from 'axios';
function ShowEmpComponent() {

  const [records, setRecords] = useState([])
  const [showTable, setShowTable] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8001/employee');
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };



  const handleShowTable = () => {
    fetchData();
    setShowTable(!showTable);
  };


  return (
    <div>
      <br></br>
      <button style={{ backgroundColor: 'green' }} onClick={handleShowTable} >{showTable ? "HIDE details" : "GET details"}</button>
      <br></br>
      <br></br>
      {showTable && (
        <><h1 className="text-3xl font-bold text-center bg-slate-500 bg-clip-padding">EMPLOYEE LIST</h1>
        <br></br>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DEPARTMENT</th>
                <th>DESIGNATION</th>
                <th>SALARY</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (

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
        </>)}
    </div>

  )
}

export default ShowEmpComponent   