"use client"

import { useContext, useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Divider } from "@mui/material";
import { Pencil1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";
import MenuModal from "./MenuModal";
import { MenuContext } from "@/context/MenuContext";


export function MenuCards() {
  const { state, fetchMenus, fetchMenuById } = useContext(MenuContext);

  const [open, setOpen] = useState(false);

  // Function to toggle expand/collapse for a specific menu
  // const toggleExpand = (menuId: number) => {
  //   setExpanded((prev) => ({
  //     ...prev,
  //     [menuId]: !prev[menuId], // Toggle the specific menu's expanded state
  //   }));
  // };

  const handleSelectedMenu = (id: number) => {
    fetchMenuById(id);
    setOpen(oldState => !oldState);
  }

  useEffect(() => {
    fetchMenus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (state.loading) {
    return (
      <div className="flex flex-col items-center justify-center p-32">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="mt-2 sm:p-8 md:p-12 lg:p-24">
      <div className="flex flex-row justify-between">
        <h3 className="text-2xl  font-bold">Menus</h3>
        <Button variant={'ghost'} className="bg-green-400 text-white">Novo Menu</Button>
      </div>


      <div className="mt-4 flex flex-row gap-2">
        {state.menus.map((menu: any) => (
          <div
            key={menu.id}
            className={`
              overflow-hidden
              rounded-md
              border
              border-slate-700 bg-slate-900
              text-white
              shadow-md`}

          >
            <div className="p-4">
              <div className="flex w-[20vw] flex-row items-center gap-4">
                <HamburgerMenuIcon />
                <span>{menu.name}</span>
              </div>
              <Divider className="my-2 bg-slate-500" />

              <div className="my-4 flex flex-row items-center gap-2">
                <p>Título:</p>
                <span>{menu.content}</span>
              </div>
            </div>
            <Divider />

            <div>
              <button onClick={() => handleSelectedMenu(menu.id)} className="flex w-full flex-row items-center justify-center gap-2 rounded-b-lg  p-4 font-bold hover:bg-slate-700/80">
                <Pencil1Icon /> Editar Menu
              </button>
            </div>
            <MenuModal id={menu.id} open={open} setOpen={setOpen} />
          </div>
        ))}
      </div>
    </div>
  )
}
