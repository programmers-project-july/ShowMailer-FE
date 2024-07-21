import React, { useCallback, useEffect, useState } from 'react';

import '@/pages/home//Home.css';
import Header from '@/components/header/Header';
import Filter from '@/components/Filter';
import Content from '@/components/Content';
import { User } from 'firebase/auth';
import { IPerformancePayload, usePerformances } from '@/hooks/usePerformances';
import axios from 'axios';

const Home = () => {
  const { performances, isLoading, isError, refetch } = usePerformances();
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [categories, setCategories] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  // Performances 데이터 업데이트
  useEffect(() => {
    if (performances) {
      const uniqueCategories = ['전체', ...new Set(performances.map((p) => p.codename))];
      // 현재 categories와 uniqueCategories가 다를 때만 상태 업데이트
      if (JSON.stringify(categories) !== JSON.stringify(uniqueCategories)) {
        setCategories(uniqueCategories);
      }
    }
  }, [performances, categories]); // performances와 categories가 변경될 때만 실행됨

  // 카테고리 변경 처리
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // 로딩 및 에러 상태 처리
  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;

  // 사용자 정보를 상위 컴포넌트에서 관리
  const handleUserChange = (user: User | null) => {
    setUserInfo(user);
  };

  return (
    <>
      <Header onUserChange={handleUserChange} />
      <div className="banner">
        서울시에서 열리는
        <br />
        <span className="highlight">공연, 전시, 콘서트, 연극</span>까지!
        <br />
        한번에 모아서 확인하고,
        <br />
        <span className="highlight">좋아요</span>로 <span className="highlight">이메일 알림</span> 받고!
        <br />
        <span className="highlight">캘린더 일정</span>까지
        <br />
        한번에 <span className="highlight">Show Mailer</span>로 관리해요!
      </div>
      <div className="container">
        <Filter categories={categories} selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <Content performances={performances} selectedCategory={selectedCategory} />
      </div>
    </>
  );
};

export default Home;
