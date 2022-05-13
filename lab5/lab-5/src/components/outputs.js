import { useState, useEffect } from "react";
import axios from "axios";

const useGetOperation = (url) => {
    const [data, setData] = useState("");

    useEffect(() => {
        async function getCars() {
            let value = await axios.get(url)
            setData(value.data)
        }
        getCars()
    }, [url]);

    return data;
};

export default useGetOperation;
