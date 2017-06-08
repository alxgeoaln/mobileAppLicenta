// var API_URL = 'http://localhost:3000/v1';
const API_URL = 'https://licenta-server.herokuapp.com';
exports.SIGNIN_URL = `${API_URL}/login`;
exports.SIGNUP_URL = `${API_URL}/register`;
exports.CONTACTS_URL = (user_id) => `${API_URL}/contact/users/${user_id}/contact`;
exports.CONTACTSDELETE_URL = (user_id, contact_id) => `${API_URL}/contact/users/${user_id}/contact/${contact_id}`;
exports.SENDMAIL_URL = (user_id) => `${API_URL}/sendLocation/sendEmail`;