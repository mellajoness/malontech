
 const baseUrl='https://jsonplaceholder.typicode.com'


export async function  GET_SERVICE(endpoint) {
    const url = baseUrl + endpoint;  
        var config = {
            method: "get",
            headers: {
            'Content-Type': 'application/json',  
            }
        };
    try {
        return await fetch(url,config);           
    } catch (error) {
        return error.response;
    }
}

export async function  GET_SERVICE_GRAPH(endpoint) {
    const url = `https://imdb8.p.rapidapi.com` + endpoint;  
        var config = {
            method: "get",
            headers: {
            'Content-Type': 'application/json',  
            'X-RapidAPI-Key': '6edf59598bmsh0c096fe1ce5e494p1120a4jsnd52eb5d1203c',
		    'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'        
            }
        };
    try {
        return await fetch(url,config);           
    } catch (error) {
        return error.response;
    }
}


export async function POST_SERVICE(body, endpoint) {
    const url = baseUrl + endpoint;  
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body) // body data type must match "Content-Type" header
      });
      return response.json();
}

export async function PUT_SERVICE(body, endpoint) {
    const url = baseUrl + endpoint;  
    const response = await fetch(url, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(body) // body data type must match "Content-Type" header
      });
      return response.json();
}



  
