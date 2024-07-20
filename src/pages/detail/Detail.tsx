import React, { useState } from 'react';
import '@/pages/detail/Detail.css';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Header from '@/components/header/Header';
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import { usePerformances } from '@/hooks/usePerformances';
import { User } from 'firebase/auth';

const Detail: React.FC = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  // 사용자 정보를 상위 컴포넌트에서 관리
  const handleUserChange = (user: User | null) => {
    setUserInfo(user);
  };

  const performance = usePerformances();

  const handleButtonClick = () => {
    // if (performance.ORG_LINK)
    //   window.open(performance.ORG_LINK, '_blank');
    alert('홈페이지 이동');
  };

  return (
    <>
      <Header onUserChange={handleUserChange} />
      <div className="detailContainer">
        <img
          className="Poster"
          src="https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=a6cb4e5a9b5b404e83454b084d88a399&thumb=Y"
          alt="Poster"
        />
        <div className="eventText">
          <h2>오페라 갈라</h2>
          <div className="heartContainer">
            <AiOutlineHeart className="heartIcon" />
            <span>좋아요 이메일 알림받기</span>
          </div>
          <p>카테고리: </p>
          <p>기간: </p>
          <p>장소: </p>
          <p>시간: </p>
          <p>이용대상: </p>
          <p>이용요금: </p>
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
