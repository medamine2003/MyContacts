import axios from "axios";

import API_URL from '../config/api';

export const register = async (user) => {
  const response = await axios.post(`${API_URL}/api/auth/register`, user);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
  return response.data;
};
