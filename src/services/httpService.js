import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectError =
    error.respone && error.response >= 400 && error.respone < 500;
  if (!expectError) {
    console.log(error);
    toast.error("An unexpected error occured");
    //toast("An unexpected error occured")
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
