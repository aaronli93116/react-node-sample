import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';

const Detail = ({}) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [type, setType] = useState("");
    const [currentEmployee, setCurrentEmployee] = useState(null)

    const { id } = useParams();
    const navigate = useNavigate();
  
    const fetchDetail = async() => {
        try {
            const response = await fetch(`http://localhost:4000/employees/${id}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const currentEmployee = await response.json();
            console.log(currentEmployee, 'curr')
            const {name, age, type} = currentEmployee;
            setCurrentEmployee(currentEmployee);
            setName(name);
            setAge(age);
            setType(type)
        } catch (error) {
            console.error('Failed to fetch employee details:', error);
        }
    }
    useEffect(() => {
        fetchDetail()
    }, [id]);


    const updateEmployee = async() => {
        const updatedEmployee = {...currentEmployee, name, age, type}
        try{
            await fetch('http://localhost:4000/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmployee),
            })
            navigate("/employees")
        } catch (err) {
            console.err('Error updateing', err)
        }
    }

    const deleteEmployee = async() => {
        try{
            await fetch(`http://localhost:4000/employees/${currentEmployee.id}`, {
                method: 'DELETE'
            })
            navigate("/employees")
        } catch (err) {
            console.error('Error deleting employee', err)
        }
    }
    return (
        <div>
            <div>
                <label>Name: </label>
                <input onChange={e => setName(e.target.value)} value={name}></input>
            </div>
            <div>
                <label>Age: </label>
                <input onChange={e => setAge(e.target.value)} value={age} ></input>
            </div>
            <div>
                <label>Type: </label>
                <select onChange={e => setType(e.target.value)} value={type}>
                    <option>Engineer</option>
                    <option>PM</option>
                </select>
            </div>
            <button onClick={updateEmployee}>Update</button>
            <button onClick={deleteEmployee}>Delete</button>
        </div>
    );
}

export default Detail;
