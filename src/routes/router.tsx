import Home from '@/pages/home/Home';
import Detail from '@/pages/detail/Detail';
import Mypage from '@/pages/mypage/Mypage';
import NotFound from '@/pages/Not-found';
import { createBrowserRouter } from 'react-router-dom';
import { performances, Tperformance } from '@/components/Content';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
  {
    path: '/:userId',
    element: <Mypage />,
  },
  {
    path: '*', // 모든 경로에 부합하지 않는 경우
    element: <NotFound />,
  },
]);
