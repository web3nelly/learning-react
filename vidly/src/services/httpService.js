import axios from 'axios';
import logger from './logService';
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  // Unexpected (network down, server down, db down, bug)
  // - Log them
  // - Display a generic and friendly error message
  if (!expectedError) {
    console.log('Logging the error:', error);
    toast.error("An unexpected error occurred! Please try again later.");
    logger.log(error);
  }

  // Expected (404: not found, 400: bad request) - CLIENT ERRORS
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}