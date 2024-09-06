"use client"

import { useContext, useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { Divider } from "@mui/material";
import { Pencil1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Button } from "../ui/button";
import MenuModal from "./MenuModal";
import { MenuContext } from "@/context/MenuContext";


export function MenuCards() {
  const { state, fetchMenus } = useContext(MenuContext);

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  // Function to toggle expand/collapse for a specific menu
  const toggleExpand = (menuId: number) => {
    setExpanded((prev) => ({
      ...prev,
      [menuId]: !prev[menuId], // Toggle the specific menu's expanded state
    }));
  };

  if (state.loading) {
    return (
      <div className="flex flex-col justify-center items-center p-32">
        <CircularProgress />
      </div>
    )
  }



  return (
    <div className="mt-2 lg:p-24 md:p-12 sm:p-8">
      <div className="flex flex-row justify-between">
        <h3 className="text-2xl  font-bold">Menus</h3>
        <Button variant={'ghost'} className="bg-green-400 text-white">Novo Menu</Button>
      </div>


      <div className="flex flex-row gap-2 mt-4 ">
        {state.menus.map((menu: any) => (
          <div
            key={menu.id}
            className={`
              bg-slate-900
              rounded-md
              shadow-md
              text-white
              border border-1
              border-slate-700
              overflow-hidden`}

          >
            <div className="p-4">
              <div className="flex flex-row gap-4 items-center w-[20vw]">
                <HamburgerMenuIcon />
                <span>{menu.name}</span>
              </div>
              <Divider className="bg-slate-500 my-2" />

              <div className="flex flex-row gap-2 my-4 items-center">
                <p>Título:</p>
                <span>{menu.content}</span>
              </div>
            </div>
            <Divider />
            {expanded[menu.id] && (
              <div className="mt-4 space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Title:
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 px-2 py-1 rounded bg-gray-700"

                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">
                    Options:
                  </label>
                  <textarea
                    className="w-full mt-1 px-2 py-1 rounded bg-gray-700"

                  />
                </div>
              </div>
            )}
            <div>
              <button onClick={() => setOpen(oldState => !oldState)} className="hover:bg-slate-700/80 font-bold flex flex-row gap-2 items-center justify-center  rounded-b-lg p-4 w-full">
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
