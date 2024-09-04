"use client"
import { Cross2Icon, Pencil1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";


export function MenuTable() {
  return (
    <div className="mt-2 lg:p-24 md:p-12 sm:p-8">
      <div className="flex flex-row justify-between">
        <h3 className="text-2xl  font-bold">Menus</h3>
        <Button className="bg-green-400 text-white">Novo Menu</Button>
      </div>
      <table className="rounded-2xl border border-1 border-white w-full mt-4">
        <thead>
          <tr className=" border border-1 border-white text-center" >
            <th>Id</th>
            <th>Nome</th>
            <th>Data</th>
            <th>Açoes</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-1 border-white text-center" >
            <td className="border border-1 border-white">1</td>
            <td className="border border-1 border-white">teste</td>
            <td className="border border-1 border-white">21/12/21</td>
            <td className="border border-1 border-white">
              <Button className="bg-red-600"><Cross2Icon /></Button>
              <Button className="bg-yellow-600"><Pencil1Icon /></Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
