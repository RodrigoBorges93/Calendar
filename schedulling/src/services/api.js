import axios from 'axios';

const api = axios.create({
    baseURL: 'https://3333-e61703cd-9142-443f-88aa-655125d333d3.ws-us02.gitpod.io'
});

export default api