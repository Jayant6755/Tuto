import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getStudentDashboard = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/user/student-dashboard`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const getUserInfo = async (id: string) => {
  const response = await axios.get(
    `${API_URL}/user/user-info/${id}`
  );

  return response.data;
};

export const getSavedTeachers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${API_URL}/student/savedTeacher`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};