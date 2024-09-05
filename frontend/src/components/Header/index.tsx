import { div } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";


function Header() {
  return (
    <div className="sticky w-full bg-background px-16">
      <Link href="/" className="main-logo flex shrink-0 items-center">
        <Image width={200} height={100} className="w-[10vw]" priority src="/assets/images/logo.png" alt="logo" />
      </Link>
    </div>

  )
}

export default Header;
