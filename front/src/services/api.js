import axios from "axios";

const API_BASE_URL = "https://aspirpn-back-ijxn6.ondigitalocean.app/api";

export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const createProject = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/projects`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const updateProject = async (id, data) => {
  try {
    await axios.put(`${API_BASE_URL}/projects/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

export const deleteProject = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/projects/${id}`);
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const getGeneralDescription = async (id) => {
  try {
    const res = await axios.get(`${API_BASE_URL}/general_description/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const updateGeneralDescription = async (id, data) => {
  try {
    await axios.put(`${API_BASE_URL}/general_description/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const getTMPGeneralDescription = async (id) => {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/tmp_general_description/${id}`
    );
    return res.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const updateTMPGeneralDescription = async (id, data) => {
  try {
    await axios.put(`${API_BASE_URL}/tmp_general_description/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
