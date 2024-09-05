'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Theme } from '@radix-ui/themes';


export function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <Theme>
        {children}
      </Theme>
    </QueryClientProvider>
  )
}
