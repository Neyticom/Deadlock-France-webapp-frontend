import apiClient from "./apiClient";

export const getPatchnotes = async () => {
  try {
    const response = await apiClient.get("/patchnotes");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des patchnotes :", error);
    throw error;
  }
};
