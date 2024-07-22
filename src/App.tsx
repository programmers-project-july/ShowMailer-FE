import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from '@/routes/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    }
  }
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default App;
