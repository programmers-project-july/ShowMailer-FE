import React from 'react';

import '@/pages/home//Home.css';
import Header from '@/components/header/Header';
import Filter from '@/components/Filter';
import Content from '@/components/Content';

const Home = () => {
  return (
    <>
      <Header />
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
        한번에 <span className="highlight">~~~</span>로 관리해요!
      </div>
      <div className="container">
        <Filter />
        <Content />
      </div>
    </>
  );
};

export default Home;
