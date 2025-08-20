import Home from '@/pages/home/Home';
import Detail from '@/pages/detail/Detail';
import Mypage from '@/pages/mypage/Mypage';
import NotFound from '@/pages/Not-found';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/detail/:codename/:title/:date',
    element: <Detail />,
  },
  {
    path: '/mypage',
    element: <Mypage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
