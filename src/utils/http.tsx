import axios from 'axios';

const baseURL = `/`;
const instance = axios.create({ baseURL });
instance.interceptors.request.use(
  config=> {
    return config
  },
  err => {
    console.log(err)
  }
)
instance.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    console.error(err);

    return Promise.reject(err);
  }
);

export default instance;

export const fileUploadUrl = `${baseURL}files/upload.json`;

export const fileUrl = `${baseURL}files/`;
