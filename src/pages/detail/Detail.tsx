import React from 'react';
import '@/pages/detail/Detail.css';
import { useParams } from 'react-router-dom';

import Header from '@/components/header/Header';
import { AiFillHeart  } from 'react-icons/ai';
import { AiOutlineHeart   } from 'react-icons/ai';

const Detail: React.FC = () => {
  return (
    <>
      <Header />
      <div className="full-container">
        <div className="detail-container">
          <img
            className="Poster"
            src="https://culture.seoul.go.kr/cmmn/file/getImage.do?atchFileId=a6cb4e5a9b5b404e83454b084d88a399&thumb=Y"
            alt="Poster"
          />
          <div className="event-text">
            <h2>공연제목</h2>
            <AiOutlineHeart />
            <p>카테고리: </p>
            <p>기간: </p>
            <p>장소: </p>
            <p>시간: </p>
            <p>이용대상: </p>
            <p>이용요금: </p>
          </div>
        </div>
        <button type="button">홈페이지 바로 가기</button>
      </div>
    </>
  );
};

export default Detail;
