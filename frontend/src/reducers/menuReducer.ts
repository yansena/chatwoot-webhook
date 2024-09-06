import { MenuProps } from "@/types";
import { MenuState } from "@/context/MenuContext";

export type MenuAction =
  | { type: "FETCH_MENUS_START" }
  | { type: "FETCH_MENUS_SUCCESS"; payload: MenuProps[] }
  | { type: "FETCH_MENUS_ERROR"; payload: string }
  | { type: "GET_MENU_START" }
  | { type: "GET_MENU_SUCCESS"; payload: MenuProps }
  | { type: "GET_MENU_ERROR"; payload: string }
  | { type: "ADD_MENU"; payload: MenuProps }
  | { type: "SET_MENU"; payload: MenuProps }
  | { type: "UPDATE_MENU"; payload: MenuProps }
  | { type: "DELETE_MENU"; payload: number };

export const menuReducer = (state: MenuState, action: MenuAction) => {
  switch (action.type) {
    case "FETCH_MENUS_START":
      return { ...state, loading: true, error: null };
    case "FETCH_MENUS_SUCCESS":
      return { ...state, loading: false, menus: action.payload };
    case "FETCH_MENUS_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "GET_MENU_START":
      return { ...state, loading: true, error: null };
    case "GET_MENU_SUCCESS":
      return { ...state, loading: false, selectedMenu: action.payload };
    case "GET_MENU_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD_MENU":
      return {
        ...state,
        loading: false,
        menus: [...state.menus, action.payload],
      };
    case "SET_MENU":
      return { ...state, loading: false, selectedMenu: action.payload };
    case "UPDATE_MENU":
      return {
        ...state,
        menus: state.menus.map((menu) =>
          menu.id === action.payload.id ? action.payload : menu
        ),
      };
    case "DELETE_MENU":
      return {
        ...state,
        menus: state.menus.filter((menu) => menu.id !== action.payload),
      };
    default:
      throw Error("Unknown action: " + action);
  }
};
