import jwtDecode from 'jwt-decode';

const token = localStorage.getItem('jwt-sp-token');
let result = {};
if(token) {
    var decoded = jwtDecode(token);

    var current_time = new Date().getTime() / 1000;
    if (current_time < decoded.exp) { 
        result = decoded
    }
}

export default result;