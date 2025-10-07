import axios from "axios";

import API_URL from '../config/api';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getContacts = async () => {
  const res = await axios.get(`${API_URL}/api/contacts`, getAuthHeader());
  return res.data;
};

export const createContact = async (contactData) => {
  const res = await axios.post(`${API_URL}/api/contacts`, contactData, getAuthHeader());
  return res.data;
};

export const deleteContact = async (id) => {
  const res = await axios.delete(`${API_URL}/api/contacts/${id}`, getAuthHeader());
  return res.data;
};

export const updateContact = async (id, contactData) => {
  const res = await axios.patch(`${API_URL}/api/contacts${id}`, contactData, getAuthHeader());
  return res.data;
};
