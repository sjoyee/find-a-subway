import api from "./api";

export const listSubwayOutlets = async (setSubwayOutlets) => {
  await api.get("/api/v1/subway-outlets").then((response) => {
    setSubwayOutlets(response.data);
  });
};
