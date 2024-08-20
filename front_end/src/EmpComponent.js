import React, { useState,useEffect} from 'react';
import './Emp.css'
import axios from 'axios';
export const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [salary, setSalary] = useState('');

  const[deptrecords,setDeptrecords]=useState([])

  const[desigrecord,setDesigrecord]=useState([])

  useEffect(() => {

    const fetchDept = async () => {
        try {
            const response = await axios.get('http://localhost:8001/department');
            setDeptrecords(response.data);
            //console.log(deptrecords)
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };
    

    fetchDept();

},[]);
const fetchDesig = async (dept_id) => {
    try {
        const response = await axios.get(`http://localhost:8001/designation/${dept_id}`);
        setDesigrecord(response.data);
        console.log(desigrecord)
    } catch (err) {
        console.error('Error fetching data:', err);
    }
};


  const handleDepartmentChange=(e)=>{
        
        console.log("handle departnment change")
        setDepartment(e.target.value)
        console.log(deptrecords)
        //setDesignation('')
        const selectedDept = deptrecords.find(dept => dept.department === e.target.value);
        if(selectedDept!==null){
            fetchDesig(selectedDept.id)
        }
        
 
  }
  

  const handleSubmit=(e)=>{
    e.preventDefault()

    console.log({name,department,designation,salary});
    const Emp={name,department,designation,salary}
    fetch("http://localhost:8001/employee",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(Emp)
    }).then(()=>{
        console.log("New Employee added");
        
    })

    setName('')
    setDepartment('')
    setDesignation('')
    setSalary('')
  };

  return(
    <form onSubmit={handleSubmit} >
        <div class="form-group">
            <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name:</label>
            <input 
                type='text'
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                required
            />
        </div>
        <div class="form-group">
            <label for="department" class="block text-sm font-medium leading-6 text-gray-900">Department:</label>
            <select 
                value={department}
                onChange={handleDepartmentChange}
                required>
                
                <option value="" disabled>select department</option>
                {deptrecords.map((dept)=>(
                    <option key={dept.id}  value={dept.department} >{dept.department}</option>
                ))}

            </select>
        </div>

        <div class="form-group">
            <label for="designation" class="block text-sm font-medium leading-6 text-gray-900">Designation:</label>
            <select
                value={designation}
                onChange={(e)=>setDesignation(e.target.value)}
                required>

                <option value="" disabled>select designation</option>
                {department&&desigrecord.map((desig)=>(
                    <option key={desig.id} value={desig.designation}>{desig.designation}</option>
                ))}
            </select>
        </div>
        <div class="form-group">
            <label for="salary" class="block text-sm font-medium leading-6 text-gray-900">Salary:</label>
            <input
                type='number'
                value={salary}
                onChange={(e)=>setSalary(e.target.value)}
                required

            />
        </div>

        <button type='submit' class="block text-sm font-medium leading-6">Submit</button>
        
    </form>
  )
}
