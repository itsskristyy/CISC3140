import React, {useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function UpdateCars() {

    const {id} = useParams()
    const [data, setData] = useState(null)
    console.log(data)

    const handleSubmitOwner = async (e) => {
        e.preventDefault()
        const info = await axios.put("http://localhost:8000/owners/", {update: [{ id: id, name: e.target[0].value }] })
        setData(info)
        e.target[0].value = ""
    }
    const handleSubmitEmail = async (e) => {
        e.preventDefault()
        const info = await axios.put("http://localhost:8000/cars/update/email", {update: [{ id: id, email: e.target[0].value }] })
        setData(info)
        e.target[0].value = ""
    }

    return (
        <div>
            <div>
                <h2> Update the owner: </h2>
                <form onSubmit={(event) => handleSubmitOwner(event)}>
                    <input placeholder={"enter new name here."}/>
                </form>
            </div>
            <div>
                <h2> Update the Email Address: </h2>
                <form onSubmit={(event) => handleSubmitEmail(event)}>
                    <input placeholder={"enter the email here."}/>
                </form>
            </div>
            {data &&

            data.status === 200 ?
                <h1>Congrats! It was updated. </h1> : <h1></h1>}
        </div>
    )
}

export default UpdateCars;
