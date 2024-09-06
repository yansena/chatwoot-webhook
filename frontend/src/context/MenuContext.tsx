import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import axios, { AxiosError } from "axios";
import { MenuProps } from '../types/index';
import { MenuAction, menuReducer } from "@/reducers/menuReducer";
import api from "@/app/api/api";

export interface MenuState {
  menus: MenuProps[];
  selectedMenu: MenuProps | null;
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  menus: [],
  selectedMenu: null,
  loading: false,
  error: null,
};

interface MenuContextProps {
  state: MenuState;
  dispatch: Dispatch<MenuAction>;
  fetchMenus: () => Promise<void>;
  fetchMenuById: (id: number) => Promise<void>;
  createMenu: (menu: MenuProps) => Promise<void>;
  updateMenu: (menu: MenuProps) => Promise<void>;
  deleteMenu: (id: number) => Promise<void>;
}

//TODO: REFACTOR FOR HANDLING CORRECTLY ERRORS

export const MenuContext = createContext<MenuContextProps>({} as MenuContextProps);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(menuReducer, initialState);

  const fetchMenus = async () => {
    dispatch({ type: "FETCH_MENUS_START" });
    try {
      const { data } = await api.get<MenuProps[]>('/menu/all');
      dispatch({ type: "FETCH_MENUS_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_MENUS_ERROR", payload: error.message });
    }
  };

  const fetchMenuById = async (id: number) => {
    dispatch({ type: "GET_MENU_START" });
    try {
      const { data } = await api.get<MenuProps>(`/menu/${id}`);
      dispatch({ type: 'GET_MENU_SUCCESS', payload: data })
    } catch (error: any) {
      dispatch({ type: "GET_MENU_ERROR", payload: error.message });
    }
  }

  const createMenu = async (menu: MenuProps) => {
    try {
      const { data } = await axios.post<MenuProps>('http://127.0.0.1:3001/api/menu/create', menu);
      dispatch({ type: "ADD_MENU", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_MENUS_ERROR", payload: error.message });
    }
  };

  const updateMenu = async (menu: MenuProps) => {
    try {
      const { data } = await axios.put<MenuProps>(`http://127.0.0.1:3001/api/menu/${menu.id}`, menu);
      dispatch({ type: "UPDATE_MENU", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_MENUS_ERROR", payload: error.message });
    }
  };

  const deleteMenu = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:3001/api/menu/${id}`);
      dispatch({ type: "DELETE_MENU", payload: id });
    } catch (error: any) {
      dispatch({ type: "FETCH_MENUS_ERROR", payload: error.message });
    }
  };

  return (
    <MenuContext.Provider value={{
      state,
      dispatch,
      fetchMenus,
      fetchMenuById,
      createMenu,
      updateMenu,
      deleteMenu
    }}>
      {children}
    </MenuContext.Provider>
  )
}