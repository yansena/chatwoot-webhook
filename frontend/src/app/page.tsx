
import { MenuTable } from "@/components/MenuTable";
import { Button } from "@/components/ui/button";
import { useMenus } from "@/hooks/useMenu";
import { Cross2Icon, Pencil1Icon } from '@radix-ui/react-icons'

export default function Home() {

  const { menus, isLoading, error, removeMenu } = useMenus();

  return (
    <main className="text-center overflow-hidden pt-24 after:content-[''] after:absolute after:inset-0 after:mx-auto after:w-[56rem] after:h-[56rem] after:bg-gradient-to-tl after:to-amber-500/30  after:from-fuchsia-600/30 dark:after:to-amber-400/30 dark:after:from-fuchsia-800/50 after:blur-[200px] after:rounded-full after:-z-1">
      <div className="">
        <h1 className="text-3xl font-bold">Olá bem vindo ao Webhook do ImpulseChat</h1>
        <span>A baixo se encontram os ultimos menu interativos cadastrados</span>
      </div >
      <MenuTable />
    </main >
  );
}
