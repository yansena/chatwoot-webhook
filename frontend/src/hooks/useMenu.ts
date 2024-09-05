import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createMenu,
  fetchMenus,
  deleteMenu,
  fetchLastMenu,
} from "../app/api/route";

export const useMenus = () => {
  const queryClient = useQueryClient();

  const {
    data: menu,
    error: menuError,
    isLoading: menuLoading,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: fetchLastMenu,
  });

  const {
    data: menus,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["allMenus"],
    queryFn: fetchMenus,
  });

  const addMenu = useMutation({
    mutationFn: createMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });

  const removeMenu = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });

  return {
    menu,
    menuError,
    menuLoading,
    menus,
    error,
    isLoading,
    addMenu,
    removeMenu,
  };
};
