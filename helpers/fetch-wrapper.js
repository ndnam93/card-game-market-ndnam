import { authService } from '../services';


function get(url) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(url)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function post(url, body) {
  console.log(url, body)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        credentials: 'omit',
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);
}

function put(url, body) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader(url) },
        body: JSON.stringify(body)
    };
    return fetch(url, requestOptions).then(handleResponse);    
}


// helper functions

function authHeader(url) {
    const user = authService.userValue;
    const isLoggedIn = user && user.tokens;
    const isApiUrl = url.startsWith(process.env.NEXT_PUBLIC_API_URL);
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.tokens.access.token}` };
    } else {
        return {};
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        
        if (!response.ok) {
            if ([401, 403].includes(response.status) && authService.userValue) {
                authService.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


export const fetchWrapper = {
  get,
  post,
  put,
};
