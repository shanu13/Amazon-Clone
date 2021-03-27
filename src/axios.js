import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://us-central1-clone-4d3fd.cloudfunctions.net/api'
})

export default instance;       

//https://us-central1-clone-4d3fd.cloudfunctions.net/api
// http://localhost:5001/clone-4d3fd/us-central1/api