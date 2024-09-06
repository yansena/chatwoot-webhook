'use client'

import { Theme } from '@radix-ui/themes';
import { MenuProvider } from '@/context/MenuContext';

export function Providers({ children }: { children: React.ReactNode }) {

  return (
    <MenuProvider>
      <Theme>
        {children}
      </Theme>
    </MenuProvider>
  )
}
