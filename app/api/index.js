// var API_URL = 'http://localhost:3000/v1';
var API_URL = 'https://licenta-server.herokuapp.com';
exports.SIGNIN_URL = `${API_URL}/login`;
exports.SIGNUP_URL = `${API_URL}/register`;
exports.PHONES_URL = (user_id) => `${API_URL}/phoneNumber/users/${user_id}/phoneNumber`;