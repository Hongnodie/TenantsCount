import { useEffect, useState } from "react"
import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [error, setError] = useState(false);

    // AUTO FETCH by url
    useEffect(()=>{
        const fetchData = async () => {
            setLoadingStatus(true);
            try{
                const res = await axios.get(url);
                setData(res.data);
            } catch (err) {
                setError(err);
            }
            setLoadingStatus(false);
        }
        fetchData();
    },[])

    //  MANUAL FETCH as one-off
    const reFetch = async () => {
        setLoadingStatus(true);
        try{
            const res = await axios.get(url);
            console.log(res);
            setData(res.data);
        } catch (err) {
            setError(err);
        }
        setLoadingStatus(false);
    }

    return {data, loadingStatus, error, reFetch}
};

export default useFetch;