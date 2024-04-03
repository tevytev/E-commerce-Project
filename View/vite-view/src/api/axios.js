import axios from "axios";

export default axios.create({
    baseURL: 'https://api.tevdev-ecommerce.com',
    withCredentials: true
});