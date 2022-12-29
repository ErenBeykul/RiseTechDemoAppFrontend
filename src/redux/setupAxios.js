export default function setupAxios(axios) {
  axios.interceptors.request.use(
    config => {      
      config.baseURL = process.env.REACT_APP_API_BASE_URL;      
      config.headers.Authorization = process.env.REACT_APP_API_AUTH_TOKEN;    
      return config;
    },
    err => Promise.reject(err)
  );
}