import axios from 'axios';

const api = axios.create({
    baseURL: 'https://backend-calendario-auditoria.herokuapp.com/'
});

export default api