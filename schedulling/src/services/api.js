import axios from 'axios';

const api = axios.create({
    baseURL: 'https://5000-f72f0843-68f4-4713-bf61-0678e4594b8e.ws-us02.gitpod.io/'
});

export default api