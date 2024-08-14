import React, { useState } from 'react';
import './Emp.css'
export const EmployeeForm = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [salary, setSalary] = useState('');

  const departmentOption=['HR','IT','Admin','Finance']

  const designationOptions={
    HR:['People Management',
        'Talent Acquisition HR Intern',
        'Staffing Specialist',
        'Manager',],
    IT:['Web Developer',
        'Analyst',
        'Cloud Architect',
        'Database Administrator', 
        'DevOps Engineer',
        'Manager', ],
    Admin:['Receptionist', 
        'Auditing Clerk',
        'office Assistant',
        'Manager', ],
    Finance:['Financial Analyst',
        'Chartered accountant', 
        'Financial advisor',
        'Manager', ],
  }

  const handleDepartmentChange=(e)=>{
        setDepartment(e.target.value)
        setDesignation('')
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
        <div>
            <label>Name:</label>
            <input 
                type='text'
                value={name}
                onChange={(e)=>setName(e.target.value)} 
                required
            />
        </div>
        <div>
            <label>Department:</label>
            <select 
                value={department}
                onChange={handleDepartmentChange}
                required>
                
                <option value="" disabled>select department</option>
                {departmentOption.map((dept)=>(
                    <option key={dept} value={dept} >{dept}</option>
                ))}

            </select>
        </div>

        <div>
            <label>Designation:</label>
            <select
                value={designation}
                onChange={(e)=>setDesignation(e.target.value)}
                required>

                <option value="" disabled>select designation</option>
                {department&&designationOptions[department].map((desig)=>(
                    <option key={desig} value={desig}>{desig}</option>
                ))}
            </select>
        </div>
        <div>
            <label>Salary:</label>
            <input
                type='number'
                value={salary}
                onChange={(e)=>setSalary(e.target.value)}
                required

            />
        </div>

        <button type='submit'>Submit</button>
        
    </form>
  )
}
