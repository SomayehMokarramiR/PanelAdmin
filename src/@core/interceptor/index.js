import axios from "axios";
import { getItem, removeItem } from "../common/storage.services";
import toast from "react-hot-toast";

const baseURL = "https://acadapi.etacorealtime.ir/api";

const instance = axios.create({
  baseURL: baseURL,
});


const onSuccess = (response) => {
  return response.data
}

const onError = (err) => {
  console.log(err);

  if (err.message === "Network Error"){
      toast.error("توکن شما منقضی شده است")
      removeItem('token');
      window.location.pathname = '/login'
  }

  else if(err.response.status === 401){
      // clearStorage()
      toast.error("توکن شما منقضی شده است")
      removeItem('token');
      window.location.pathname = '/login' // or '/'
  }

  if(err.response.status >= 400 && err.response.status < 500){
      toast.error("Client request error: " + err.response.status);
  }

  return Promise.reject(err);
}

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use((opt) => {
  const token = getItem("token") ? getItem("token") : null;
  if (token) opt.headers.Authorization = "Bearer " + token;
  return opt;
});

export default instance;
