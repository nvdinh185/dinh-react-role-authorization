import { authenticationService } from '../_services/authentication.service';
import { history } from '../_helpers/history';

export function handleResponse(response) {
    // console.log("response: ", response);
    return response.text().then(text => {
        // console.log("text: ", text);
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if ([401].indexOf(response.status) !== -1) {
                // auto logout if 401 Unauthorized response returned from api
                authenticationService.logout();
                history.push('/login');
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        // console.log("data: ", data);
        return data;
    });
}