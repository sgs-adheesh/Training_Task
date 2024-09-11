import React, { useState } from 'react'
import axios from 'axios'

function Content() {

const [record,setRecord]=useState([])
const [show,setShow]=useState(false)
const handleClick = async () =>{
    const emps = await axios.get('http://localhost:8001/employee')
    setRecord(emps.data)
    setShow(!show)

}
  return (
    <main>
        <button onClick={handleClick}>Show me</button>

    </main>
  )
}

export default Content