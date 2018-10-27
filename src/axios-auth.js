import axios from 'axios'

const instance = axios.create({
   baseURL: '//api.smartduka.busaracenterlab.org',
});

instance.interceptors.request.use(
    config => {
        config.headers.authorization = 'Bearer ' + localStorage.getItem('token');
        return config;
    },
    error => Promise.reject(error)
);

export default instance;
