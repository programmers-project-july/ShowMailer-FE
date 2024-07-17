import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '@/App.css';
import BgImg from '@/assets/imgs/BgImg.png';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <div className="pcOverlay">
        <img src={BgImg} className="pcImage" alt="PC Description" />
        <div className="appContainer">
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </div>
      </div>
    </>
  );
}

export default App;
