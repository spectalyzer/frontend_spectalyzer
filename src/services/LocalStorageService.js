// LocalStorageService.js
export const storeToken = (token) => {
  try {
    localStorage.setItem("token", token); // Ensure 'token' is stored in localStorage
  } catch (error) {
    console.error("Error storing token:", error);
  }
};

const getToken = () => {
  let token = localStorage.getItem("token");
  return token;
};
const removeToken = (value) => {
  localStorage.removeItem(value);
};

export { getToken, removeToken };
