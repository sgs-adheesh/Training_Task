import React, { useState, useEffect } from 'react';
import '../Emp.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { createContext } from 'react';
//import ShowEmpComponent from './ShowEmpComponent';

//export const EmpContext = createContext()

export const EmployeeForm = () => {
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [designation, setDesignation] = useState('');
    const [salary, setSalary] = useState('');

    const [show, setShow] = useState(true)
    const [error, setError] = useState({
        name: '',
        department: '',
        designation: '',
        salary: '',

    });
    const [response, setResponse] = useState('');
    const [dupname, setDupname] = useState(false);

    const [deptrecords, setDeptrecords] = useState([])

    const [desigrecord, setDesigrecord] = useState([])

    const navigate = useNavigate()
  

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

    }, []);
    const fetchDesig = async (dept_id) => {
        try {
            const response = await axios.get(`http://localhost:8001/designation/${dept_id}`);
            setDesigrecord(response.data);
            console.log(desigrecord)
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };


    const handleDepartmentChange = (e) => {

        console.log("handle departnment change")
        setDepartment(e.target.value)
        console.log(deptrecords)
        //setDesignation('')
        const selectedDept = deptrecords.find(dept => dept.department === e.target.value);
        if (selectedDept !== null) {
            fetchDesig(selectedDept.id)
        }


    }


    const handleSubmit = (e) => {



        e.preventDefault()

        if (validate()) {
            console.log({ name, department, designation, salary });
            const Emp = { name, department, designation, salary }
            fetch("http://localhost:8001/employee", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Emp)
            })
                //axios.post('http://localhost:8001/employee',Emp)
                .then((resp) => {
                    if (resp.status !== 200) {
                        setResponse("Employee not added..duplicate name")
                        setDupname(true)
                        console.log(resp)

                    }
                    else {
                        setResponse("Employee added successfully")
                        console.log(resp)

                    }
                })

                .catch((error) => {
                    console.error(error)
                })

            setName('')
            setDepartment('')
            setDesignation('')
            setSalary('')
            setDupname(false)
        }



    };

    const handleBack = () => {
        try {
            navigate(`/`)

            setShow(!show)

        }
        catch (err) {
            console.error('Error in edit emp', err)
        }
    }



    const validate = () => {
        const newErrors = {}
        let isValid = true
        const Emp = { name, department, designation, salary }
        if (Emp.name.length < 3) {
            newErrors.name = "Name should have atleast 3 letter"
            isValid = false
        }
        if (Emp.department === '') {
            newErrors.department = "Select the department"
            isValid = false
        }
        if (Emp.designation === '') {
            newErrors.designation = "Select the designation"
            isValid = false
        }
        if (Emp.salary <= 1000) {
            newErrors.salary = "Salary should greater than 1000"
            isValid = false
        }
        setError(newErrors)
        return isValid

    }
    return (
        //<EmpContext.Provider  value={{show,setShow}}>
            <form onSubmit={handleSubmit} >
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={() => handleBack()} type="button" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Back</button>                
                </div>
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 animate-pulse">REGISTRATION FORM</h2>
                </div>
                
                {dupname
                    ? <span className="flex items-center text-sm font-semibold text-red-600 animate-bounce">
                        {response}
                    </span>
                    :
                    <span className="flex items-center text-sm font-semibold text-green-600 animate-pulse" >
                        {response}
                    </span>}

                <div className="form-group">
                    <label htmlFor="name" className="block text-sm font-gray  text-gray-900">Name:</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {error.name && <span style={{ color: 'red' }} >{error.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="department" className="block text-sm font-medium leading-6 text-gray-900">Department:</label>
                    <select
                        value={department}
                        onChange={handleDepartmentChange}
                    >

                        <option value="" disabled>select department</option>
                        {deptrecords.map((dept) => (
                            <option key={dept.id} value={dept.department} >{dept.department}</option>
                        ))}

                    </select>
                    {error.department && <span style={{ color: 'red' }} >{error.department}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">Designation:</label>
                    <select
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                    >

                        <option value="" disabled>select designation</option>
                        {department && desigrecord.map((desig) => (
                            <option key={desig.id} value={desig.designation}>{desig.designation}</option>
                        ))}
                    </select>
                    {error.designation && <span style={{ color: 'red' }} >{error.designation}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="salary" className="block text-sm font-medium leading-6 text-gray-900">Salary:</label>
                    <input
                        type='number'
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}


                    />
                    {error.salary && <span style={{ color: 'red' }} >{error.salary}</span>}
                </div>

                <button style={{ backgroundColor: 'green' }} type='submit' className="block text-sm font-medium leading-6">SUBMIT</button>

            </form>
        //</EmpContext.Provider>
    )
}
