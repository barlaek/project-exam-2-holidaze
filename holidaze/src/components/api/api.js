import React, {useEffect, useState} from 'react'

export function ApiHook(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([false]);
    const [error, setError] = useState([false]);

    useEffect(() => {
        async function getData() {
            try{
                setLoading(true);
                setError(false);

                const fetchData = await fetch(url);
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
    }, [url])

    return { data, loading, error };
}