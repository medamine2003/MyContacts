import axios from "axios";

import API_URL from '../config/api';

export const register = async (user) => {
  const response = await axios.post(`${API_URL}/auth/register`, user);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};
