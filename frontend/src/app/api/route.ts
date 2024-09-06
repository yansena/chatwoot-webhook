import { MenuProps } from "@/types";
import api from "./api";

export const fetchLastMenu = async () => {
  const { data } = await api.get("/menu/");
  return data;
};

export const fetchMenus = async () => {
  const { data } = await api.get("/menu/all");
  return data;
};

export const fetchMenuById = async (id: number) => {
  const { data } = await api.get(`/menu/${id}`);
  return data;
};

export const createMenu = async (newMenu: MenuProps) => {
  const { data } = await api.post("/menu/create", newMenu);
  return data;
};

export const editMenu = async (newMenu: MenuProps) => {
  const { data } = await api.put("/menu/:id", newMenu);
  return data;
};

export const deleteMenu = async (menuId: number) => {
  const { data } = await api.delete(`/menu/${menuId}`);
  return data;
};
