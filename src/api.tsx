import axios from 'axios';

const api = axios.create({
  baseURL: 'https://avaliacao-ambientes-trabalho.vercel.app',
});

export default api;