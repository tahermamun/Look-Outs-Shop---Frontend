import axios from 'axios';

export const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

API.defaults.headers.common['token'] = JSON.parse(localStorage.getItem('token'));
