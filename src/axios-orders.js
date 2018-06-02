import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-2b26e.firebaseio.com/'
});

export default instance;
