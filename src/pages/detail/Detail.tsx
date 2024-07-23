import React, { useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { IPerformancePayload } from '@/hooks/usePerformances';
import { fetchPerformances } from '@/apis/Performances.api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@/pages/detail/Detail.css';
import Header from '@/components/header/Header';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useLikes } from '@/hooks/useLikes';
import { removeLike } from '@/apis/Likes.api';

export const usePerformances = ({ codename, title, date }: { codename?: string; title?: string; date?: string }) => {
  const {
    data: performances = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<IPerformancePayload[]>({
    queryKey: ['performances', codename, title, date],
    queryFn: () => fetchPerformances(codename, title, undefined, date),
    // placeholderData: keepPreviousData,
  });
  return { performances, isLoading, isError, refetch };
};

const Detail: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isFilled, setIsFilled] = useState(false);

  const { codename, title, date } = useParams<{ codename: string; title: string; date: string }>();

  const {
    performances = [],
    isLoading,
    isError,
    refetch,
  } = usePerformances({
    codename,
    title,
    date,
  });

  //addLikes
  const { addLike } = useLikes();

  // 사용자 정보를 상위 컴포넌트에서 관리
  const handleUserChange = (user: User | null) => {
    setUserInfo(user);
  };

  //홈페이지 url 이동
  const handleButtonClick = () => {
    const performance = performances[0];
    if (performance.org_link) {
      window.open(performance.org_link, '_blank'); // org_link로 새 탭에서 열기
    } else {
      alert('공식 링크가 없습니다.');
    }
  };

  //like
  const handleHeartClick = () => {
    if (userInfo) {
      const payload = {
        email: userInfo.email || undefined,
        codename: performance.codename!,
        title: performance.title!,
        date: performance.date!,
      };
      // console.log(payload);
      if (isFilled) {
        removeLike(payload); // 채워진 하트일 경우 removeLike API 호출
        setIsFilled(false); // 하트 상태를 빈 상태로 변경
        console.log('좋아요 삭제');
        console.log(payload);
      } else {
        addLike(payload); // 빈 하트일 경우 addLike API 호출
        setIsFilled(true); // 하트 상태를 채워진 상태로 변경
        console.log('좋아요 추가');
      }
      setIsFilled(!isFilled); // 하트 상태 토글
    } else {
      toast.error('로그인하고 좋아요를 눌러주세요!');
    }
  };

  // 로딩 및 에러 상태 처리
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;

  // 공연 정보가 없거나, performances 배열이 비어있는 경우 처리
  if (performances.length === 0) return <div>공연 정보를 찾을 수 없습니다.</div>;

  const performance = performances[0];

  return (
    <>
      <Header onUserChange={handleUserChange} />
      <div className="detailContainer">
        <img className="Poster" src={performance.image} alt="Poster" />
        <div className="eventText">
          <h2>{performance.title}</h2>
          <div className="heartContainer" onClick={handleHeartClick} style={{ cursor: 'pointer' }}>
            {isFilled ? <AiFillHeart /> : <AiOutlineHeart />}
            <span>좋아요 이메일 알림받기</span>
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              theme="dark"
              limit={1}
              style={{ fontSize: '15px' }}
            />
          </div>
          <p>카테고리: {performance.codename}</p>
          <p>기간: {performance.date}</p>
          <p>장소: {performance.place}</p>
        </div>
      </div>
      <button type="button" className="goPageBtn" onClick={handleButtonClick}>
        홈페이지 바로 가기
      </button>
      {/* {performance.ORG_LINK} */}
    </>
  );
};

export default Detail;
