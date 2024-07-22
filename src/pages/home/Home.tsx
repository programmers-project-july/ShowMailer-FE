import React, { startTransition, useCallback, useEffect, useState } from 'react';

import '@/pages/home//Home.css';
import Header from '@/components/header/Header';
import Filter from '@/components/Filter';
import Content from '@/components/Content';
import { User } from 'firebase/auth';
import { IPerformancePayload, usePerformances } from '@/hooks/usePerformances';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [page, setPage] = useState<number>(1);
  const [allPerformances, setAllPerformances] = useState<IPerformancePayload[]>([]);

  const [userInfo, setUserInfo] = useState<User | null>(null);
  // const [filteredPerformances, setFilteredPerformances] = useState<IPerformancePayload[]>([]);

  const {
    data: performances,
    isLoading,
    isError,
    error,
  } = usePerformances({
    page,
    codename: selectedCategory.includes('/')
      ? selectedCategory.slice(0, selectedCategory.indexOf('/'))
      : selectedCategory || undefined,
    title: searchTerm || undefined,
  });

  // Performances 데이터 업데이트
  useEffect(() => {
    if (performances && Array.isArray(performances)) {
      if (page === 1 && performances.length > 0) {
        setAllPerformances(performances);
        setPage((prevPage) => prevPage + 1); // 페이지 번호 증가
      }
    }
  }, [performances, page]);

  // 페이지네이션 로직을 포함하여 공연 데이터 로드
  const loadMorePerformances = useCallback(() => {
    if (!isLoading && performances.length > 0 && page > 1) {
      setPage((prevPage) => prevPage + 1);
      setAllPerformances((prev) => [...prev, ...performances]);
    }
  }, [isLoading, performances]);

  // 카테고리 변경 핸들러
  const handleCategoryChange = useCallback((category: string) => {
    startTransition(() => {
      setSelectedCategory(category === '전체' ? '' : category);
      setSearchTerm('');
      setPage(1);
      setAllPerformances([]);
    });
    // refetch();
  }, []);

  // 검색어 변경 핸들러
  const handleSearchChange = useCallback((term: string) => {
    startTransition(() => {
      setSearchTerm(term);
      setPage(1);
      setAllPerformances([]);
    });
    // refetch();
  }, []);

  // 로딩 및 에러 상태 처리
  if (isLoading && allPerformances.length === 0) return <div>로딩 중...</div>;

  if (isError || error)
    return (
      <div>
        데이터를 불러오는 데 문제가 발생했습니다.
        <p>{error.message}</p>
      </div>
    );

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
        <Filter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
        />
        <Content
          performances={allPerformances}
          selectedCategory={selectedCategory}
          hasMore={performances.length > 0}
          onloadMore={loadMorePerformances}
        />
      </div>
    </>
  );
};

export default Home;
