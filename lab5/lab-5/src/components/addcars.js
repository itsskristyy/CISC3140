import React, {useState} from "react";
import axios from "axios";

function AddCars() {

    const [data, setData] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        let obj = {
            add : [{
                id: event.target[0].value,
                name: event.target[1].value,
                email: event.target[2].value,
                make: event.target[3].value,
                model: event.target[4].value,
                year: event.target[5].value,
                score: event.target[6].value
            }]
        }
        console.log(obj)
        const info = await axios.post("http://localhost:8000/cars/newcar", obj)
        setData(info)
        event.target[0].value = ""
        event.target[1].value = ""
        event.target[2].value = ""
        event.target[3].value = ""
        event.target[4].value = ""
        event.target[5].value = ""
        event.target[6].value = ""

    }

    return (
        <div>
            <h1>Add a Car! :</h1>
            <form onSubmit={(event) => handleSubmit(event)}>
                <input placeholder={"Enter New Car ID Here"}/>
                <input placeholder={"Enter New Owner Name Here"}/>
                <input placeholder={"Enter New Email Here"}/>
                <input placeholder={"Enter New Make Here"}/>
                <input placeholder={"Enter New Model Here"}/>
                <input placeholder={"Enter New Year Here"}/>
                <input placeholder={"Enter New Score Here"}/>
                <button type="submit" value="Submit">Submit</button>
            </form>
            {data && <div>{data.status}</div>}
        </div>
    )
}

export default AddCars;
