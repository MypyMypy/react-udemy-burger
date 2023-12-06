import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-6394d-default-rtdb.firebaseio.com//'
});

export default instance;