import Cookies from "universal-cookie"

const cookies = new Cookies();

export const getAccessTokenForAdmin = () => {
    return cookies.get('admin_token');
};

export const getRefreshTokenForAdmin = () => {
    return cookies.get('admin_refresh');
};

export const getAccessTokenForGuests = () => {
    return cookies.get('access_token');
};

export const getRefreshTokenForGuests = () => {
    return cookies.get('refesh_token');
};