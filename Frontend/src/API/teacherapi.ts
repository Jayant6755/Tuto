import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getAllTeachers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/teachers/findallteachers`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};