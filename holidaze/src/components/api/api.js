import React, {useEffect, useState} from 'react'

/**
 * Api hook component that takes two parameters
 * @param {*} url 
 * @param {*} headers 
 * @returns endpoint data
 */
export function ApiHook(url, headers) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [error, setError] = useState([false]);

    useEffect(() => {
        async function getData() {
            try{
                setLoading(true);
                setError(false);

                const fetchData = await fetch(url, headers);
                console.log(fetchData);
                const response = await fetchData.json();
                console.log(response);
                setData(response);
            } catch(error) {
                console.log(error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [url], {headers})

    return { data, loading, error };
}