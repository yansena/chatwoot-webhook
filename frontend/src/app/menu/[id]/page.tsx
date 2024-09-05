'use client'

import { fetchMenuById } from "@/app/api/route";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";


function MenuDetail() {
  const { id } = useParams();

  console.log({ id })




  return (
    <div className="flex flex-col p-24">
      <h1>
        Menu Detail
      </h1>
    </div>
  )
}

export default MenuDetail;