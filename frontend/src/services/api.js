import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8002";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const normalizeResponse = (response) => {
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (response?.data && typeof response.data === "object") {
    return response.data;
  }

  return [];
};

export const getDocuments = async () => {
  const response = await api.get("/documents/");
  return normalizeResponse(response);
};

export const getRequirements = async () => {
  const response = await api.get("/requirements/");
  return normalizeResponse(response);
};

export const getEvidence = async () => {
  const response = await api.get("/evidence/");
  return normalizeResponse(response);
};

export const getCompliance = async () => {
  const response = await api.get("/compliance/");
  return normalizeResponse(response);
};

export const getRisks = async () => {
  const response = await api.get("/risks/");
  return normalizeResponse(response);
};

export const getRemediation = async () => {
  const response = await api.get("/remediation/");
  return normalizeResponse(response);
};

export const getDashboard = async () => {
  const response = await api.get("/dashboard/");
  return normalizeResponse(response);
};

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return api.post("/documents/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default api;