import Home from "@/pages/home/home";
import Detail from "@/pages/detail/detail";
import Mypage from "@/pages/mypage/mypage";
import NotFound from "@/pages/not-found";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/detail",
    element: <Detail />,
  },
  {
    path: ":userId",
    element: <Mypage />,
  },
  {
    path: "*", // 모든 경로에 부합하지 않는 경우
    element: <NotFound />, // NotFound 컴포넌트 렌더링
  },
]);
