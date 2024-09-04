import { MenuItem } from "@/types";
import api from "./api";

export const fetchLastMenu = async () => {
  const { data } = await api.get("/menu/");
  return data;
};

export const fetchMenus = async () => {
  const { data } = await api.get("/menu/all");
  return data;
};

export const createMenu = async (newMenu: MenuItem) => {
  const { data } = await api.post("/menu/create", newMenu);
  return data;
};

export const deleteMenu = async (menuId: number) => {
  const { data } = await api.delete(`/menu/${menuId}`);
  return data;
};
