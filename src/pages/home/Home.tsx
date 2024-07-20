import React, { useEffect, useState } from 'react';

import '@/pages/home//Home.css';
import Header from '@/components/header/Header';
import Filter from '@/components/Filter';
import Content from '@/components/Content';
import { User } from 'firebase/auth';
import { IPerformancePayload, usePerformances } from '@/hooks/usePerformances';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [filteredPerformances, setFilteredPerformances] = useState<IPerformancePayload[]>([]);
  const { performances, isLoading, isError, refetch } = usePerformances();

  const [userInfo, setUserInfo] = useState<User | null>(null);
  // 사용자 정보를 상위 컴포넌트에서 관리
  const handleUserChange = (user: User | null) => {
    setUserInfo(user);
  };

  useEffect(() => {
    if (performances) {
      const categories = ['전체', ...new Set(performances.map((p) => p.codename))];
      // 필터링 로직
      const filtered =
        selectedCategory === '전체' ? performances : performances.filter((p) => p.codename === selectedCategory);

      setFilteredPerformances(filtered);

      // Filter 컴포넌트에 전달할 카테고리 목록
      const categoriesList = ['전체', ...new Set(performances.map((p) => p.codename))];

      // 이 부분은 실제로는 Filter 컴포넌트에 카테고리 목록을 prop으로 전달하는 로직을 수행합니다.
    }
  }, [selectedCategory, performances]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // Filter 컴포넌트에 전달할 카테고리 목록
  const categories = ['전체', ...new Set(performances.map((p) => p.codename))];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return (
      <div>
        Error fetching performances. <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  if (!Array.isArray(performances) || performances.length === 0) {
    return <div>No performances available.</div>;
  }

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
        <Content filteredPerformances={filteredPerformances} />
      </div>
    </>
  );
};

export default Home;
