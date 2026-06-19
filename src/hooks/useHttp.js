import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message || 'Something went wrong, failed to send request.');
    }

    return resData;
}

export default function useHttp(url, config, initialData) {

    const [data, setData] = useState(initialData);
    const [errorState, setErrorState] = useState();
    const [isLoading, setIsLoading] = useState(false);


    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(bodyData) {
        setIsLoading(true);
        setErrorState(null);

        try {

            const resData = await sendHttpRequest(url, {
                ...config,
                body: bodyData ? JSON.stringify(bodyData) : config ? config.body : null
            });
            setData(resData);
            return resData;
        } catch (error) {
            setErrorState(error.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, [url, config]);

    useEffect(() => {
        if ((config && config.method === 'GET') || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        isLoading,
        errorState,
        sendRequest,
        clearData
    };
}