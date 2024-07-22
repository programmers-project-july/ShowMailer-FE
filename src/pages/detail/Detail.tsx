import React, { useEffect, useState } from 'react';
import '@/pages/detail/Detail.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Header from '@/components/header/Header';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { User } from 'firebase/auth';
import { IPerformancePayload } from '@/hooks/usePerformances';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPerformances } from '@/apis/Performances.api';

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

  // 사용자 정보를 상위 컴포넌트에서 관리
  const handleUserChange = (user: User | null) => {
    setUserInfo(user);
  };

  // useEffect()=>{
  //   performances
  // }

  const handleButtonClick = () => {
    const performance = performances[0];
    if (performance.org_link) {
      window.open(performance.org_link, '_blank'); // org_link로 새 탭에서 열기
    } else {
      alert('공식 링크가 없습니다.');
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
          <div className="heartContainer">
            <AiOutlineHeart className="heartIcon" />
            <span>좋아요 이메일 알림받기</span>
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
