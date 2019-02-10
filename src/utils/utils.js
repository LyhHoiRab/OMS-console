import Axios from "axios";

export function get(api, urlParams){
    return Axios.get(api, {
        params          : urlParams,
        withCredentials : true,
    }).catch(error => {
        console.log(error);
    });
}

export function post(api, urlParams, bodys){
    return Axios.post(api, bodys, {
        params          : urlParams,
        withCredentials : true,
        headers         : {
            'Content-type' : 'application/json',
        },
    }).catch(error => {
        console.log(error);
    });
}

export function put(api, urlParams, bodys){
    return Axios.put(api, bodys, {
        params          : urlParams,
        withCredentials : true,
        headers         : {
            'Content-type' : 'application/json',
        },
    }).catch(error => {
        console.log(error);
    });
}