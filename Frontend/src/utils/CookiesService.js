import Cookies from 'js-cookie';

export const isAuthorizedPerson = () => {
    const access_token = Cookies.get('access_token');
    const referesh_token = Cookies.get('referesh_token');

    if(!access_token && !referesh_token){
        return false;
    }

    return true;
}

export const getAccessTokens = () => {
    return Cookies.get('access_token');
}

export const removeCookies = () => {
    Cookies.remove('access_token');
    Cookies.remove('referesh_token');
}