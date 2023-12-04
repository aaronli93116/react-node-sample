import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const List = ({}) => {
    const [employeeList, setEmployeeList] = useState([]);
    const navigate = useNavigate();
    
    const fetchData = async() => {
        const data = await fetch('http://localhost:4000/employees');
        const list = await data.json();
        setEmployeeList(list);
    }
    useEffect(() => {
        fetchData();
    }, [])

    const showEmployeeDetail = (id) => {
        navigate(`/employees/${id}`)
    }

    const addNewEmployee = () => {
        navigate('/employees/addEmployee')
    }
    return (
        <div>
            {
                employeeList.length > 0 && employeeList.map((ele, index) => {
                    return (
                        <div key={index}>
                            <button onClick={() => showEmployeeDetail(ele.id)}>{ele.name}</button>
                        </div>
                    )
                })
            }
            <button onClick={addNewEmployee}>Add new user</button>
        </div>
    )
}

export default List;
