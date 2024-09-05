import { MenuTable } from "@/components/MenuTable";

export default function Home() {
  return (
    <main className="text-center text-slate-950 overflow-hidden pt-24  after:-z-1 h-full">
      <div className="">
        <h1 className="text-3xl  font-bold">Olá bem vindo ao Webhook do ImpulseChat</h1>
        <span>A baixo se encontram os ultimos menu interativos cadastrados</span>
      </div >
      <MenuTable />
    </main >
  );
}
