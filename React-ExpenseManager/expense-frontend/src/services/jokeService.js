import axios from "axios";

export const getJoke = async () => {
  const res = await axios.get("http://localhost:8080/api/jokes");
  return res.data;
};
