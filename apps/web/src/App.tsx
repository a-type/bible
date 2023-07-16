import { clientDescriptor, hooks } from '@/store.js';
import { ReactNode, Suspense } from 'react';
import { Pages } from '@/pages/Pages.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { TooltipProvider } from '@a-type/ui/components/tooltip';

export interface AppProps {}

const queryClient = new QueryClient();

export function App({}: AppProps) {
  return (
    <Suspense>
      <TooltipProvider>
        <VerdantProvider>
          <QueryClientProvider client={queryClient}>
            <Pages />
          </QueryClientProvider>
        </VerdantProvider>
      </TooltipProvider>
    </Suspense>
  );
}

function VerdantProvider({ children }: { children: ReactNode }) {
  return <hooks.Provider value={clientDescriptor}>{children}</hooks.Provider>;
}
