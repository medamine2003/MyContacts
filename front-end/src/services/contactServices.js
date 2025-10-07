import axios from "axios";

const API_URL = "http://localhost:8000/api/contacts";

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getContacts = async () => {
  const res = await axios.get(API_URL, getAuthHeader());
  return res.data;
};

export const createContact = async (contactData) => {
  const res = await axios.post(API_URL, contactData, getAuthHeader());
  return res.data;
};

export const deleteContact = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`, getAuthHeader());
  return res.data;
};

export const updateContact = async (id, contactData) => {
  const res = await axios.patch(`${API_URL}/${id}`, contactData, getAuthHeader());
  return res.data;
};
