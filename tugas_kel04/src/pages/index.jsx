import React, { useState, useEffect } from "react";
import "./index.css";
import viteLogo from '../assets/react.svg'

export default function index() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch(`https://localhost:44353/api/VillaAPI/users`)
            .then((response) => response.json())
            .then((data) => {
                setData(data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        if (count > 0) {
            alert(`component will update & count ${count}`);
        }
    }, [count]);
    const countUp = () => {
        setCount(count + 1);
    };
    const countDown = () => {
        setCount(count - 1);
    };

    return (
        <>
        <div className="Main">
            <h3> USE EFFECT | KEL XX </h3>
            <div>
                <img src={viteLogo} className="logo react" alt="React logo" />
            </div>
            <ol>
                {data.map((member, index) => (
                    <li> {member.username.first} {member.password.last} </li>
                ))}
            </ol>
        </div>
        </>
    )
};
