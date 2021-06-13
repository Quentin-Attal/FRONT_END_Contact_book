export const postRequest = async (apiUrl: string, body: any) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    const sendRequest = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(body),
    })
        .then(res => res.json())
        .catch(error => error)
    return sendRequest

};

export const getRequest = async (apiUrl: string) => {
    const headers = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    //console.log('getRequest', apiUrl);
    return await fetch(apiUrl, headers)
};

export const deleteRequest = async (apiUrl: string) => {
    const headers = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }
    //console.log('getRequest', apiUrl);
    const getRequest = await fetch(apiUrl, headers)
        .then(res => res.json())
        .catch(error => error)
    return getRequest

};

export const putRequest = async (apiUrl: string, body: any) => {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    const sendRequest = await fetch(apiUrl, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(body),
    })
        .then(res => res.json())
        .catch(error => error)
    return sendRequest

};