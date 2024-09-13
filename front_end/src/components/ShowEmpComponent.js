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

  const handleAdd=()=>{
    navigate('/add')
  }


  return (
    <div>
      <div className="mt-6 flex items-center justify-center gap-x-6">
        <button onClick={handleAdd} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 align-middle">Add Employee</button>
        <button onClick={handleShowTable} type="button" className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 align-middle">{showTable?"Hide details":"Show All Employee"}</button>
      </div>
      
      {showTable && (
        <><div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 animate-pulse">LIST OF EMPLOYEES</h2>
          </div>
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
                  <td><button onClick={() => handleEdit(item)} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit</button></td>
                  <td><button onClick={() => handleDelete(item)} type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Delete</button></td>

                </tr>
              ))}

            </tbody>
          </table>


        </>)}
    </div>

  )
}

export default ShowEmpComponent   