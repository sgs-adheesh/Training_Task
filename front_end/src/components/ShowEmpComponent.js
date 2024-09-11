import React, { useEffect, useState } from 'react'
import '../ShowEmp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ShowEmpComponent() {

  const [filteredRecords, setFilteredRecords] = useState([]);
  const [search,setSearch]=useState('')
  const [records, setRecords] = useState([])
  const [showTable, setShowTable] = useState(false);
  const navigate = useNavigate()
  const [empitem, setEmpitem] = useState(null)

  useEffect(() => {
    fetchData();
    
  }, []);


  useEffect(() => {

    if(empitem!=null){
      navigate(`/update/${empitem.id}`,{state:{id:empitem}})
    }
  }, [empitem,navigate]);

  
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8001/employee');
      setRecords(response.data);
      setFilteredRecords(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const searchEmp=(e)=>{
    
    const searchValue = e.target.value.toLowerCase();
    setSearch(searchValue);
    const filteredRecords = records.filter(item =>
      item.name.toLowerCase().includes(searchValue)
    );
    setFilteredRecords(filteredRecords);
  }


  const handleDelete = async (item) => {
    try {
     
        const res = await axios.delete(`http://localhost:8001/employee/${item.id}`)
        console.log(res)
        fetchData()
        alert(`${item.name} removed from the database`)

    }
    catch (err) {
      console.error("error is deleting emp", err)
    }
  }

  const handleEdit =  (item) => {
    try {
      console.log(item)
      setEmpitem(item.id)

    }
    catch (err) {
      console.error('Error in edit emp', err)
    }
  }


  const handleShowTable = () => {
    fetchData();
    setShowTable(!showTable);
  };

  const handleBack=()=>{
    navigate('/')
  }


  return (
    <div>
      <button style={{ backgroundColor: 'blue' }} onClick={handleBack} >BACK</button>
      <br></br>
      <br></br>
      <button style={{ backgroundColor: 'green' }} onClick={handleShowTable} >{showTable ? "HIDE details" : "GET details"}</button>
      <br></br>
      <br></br>
      <form className='searchForm'>
        <label htmlFor='searchTab'>
          <input 
            id='search'
            type="text"
            role='searchbox'
            placeholder='search employee'
            value={search}
            onChange={(e)=>searchEmp(e)} 
          />
        </label>
      </form>
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
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((item, index) => (

                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.department}</td>
                  <td>{item.designation}</td>
                  <td>{item.salary}</td>
                  <td><button style={{ backgroundColor: 'blue' }} onClick={() => handleEdit(item)}>Edit</button></td>
                  <td><button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(item)}>Delete</button></td>
                </tr>
              ))}

            </tbody>
          </table>


        </>)}
    </div>

  )
}

export default ShowEmpComponent   