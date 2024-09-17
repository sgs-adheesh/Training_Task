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
      navigate(`/update/${empitem}`,{state:{id:empitem}})
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
      (item.name.toLowerCase().includes(searchValue))
    ||(item.department.toLowerCase().includes(searchValue))
    ||(item.designation.toLowerCase().includes(searchValue))
    ||(item.salary.toString().includes(searchValue))
    );
    setFilteredRecords(filteredRecords);
  }


  const handleDelete = async (item) => {
    try {
     
        const res = await axios.delete(`http://localhost:8001/employee/${item.id}`)
        console.log(res)
        fetchData()
        alert(`Proceeding for the termination of ${item.name}`)

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
        <button onClick={handleAdd} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 align-middle">Add Employee</button>
        <button onClick={handleShowTable} type="button" className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 align-middle">{showTable?"Hide details":"Show All Employee"}</button>
      </div>
      
      {showTable && (
        <><div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 animate-pulse">LIST OF EMPLOYEES</h2>
          </div>
          <form className='searchForm'>
        <label htmlFor='searchTab' >
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
          <table className="min-w-full divide-y divide-gray-400">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">NAME</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">DEPARTMENT</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">DESIGNATION</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">SALARY</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-blue-500 uppercase tracking-wider">EDIT</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-red-500 uppercase tracking-wider">DELETE</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((item, index) => (

                <tr key={index} className={`${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                } hover:bg-gray-200 transition-colors duration-200`}>
                  
                  <td className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">{item.id}</td>
                  <td className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">{item.name}</td>
                  <td className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">{item.department}</td>
                  <td className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">{item.designation}</td>
                  <td className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider">{item.salary}</td>
                  <td className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider"><button onClick={() => handleEdit(item)} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Edit</button></td>
                  <td className="px-6 py-3 text-center text-xs font-medium text-black uppercase tracking-wider"><button onClick={() => handleDelete(item)} type="button" className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Delete</button></td>

                </tr>
              ))}

            </tbody>
          </table>


        </>)}
    </div>

  )
}

export default ShowEmpComponent   