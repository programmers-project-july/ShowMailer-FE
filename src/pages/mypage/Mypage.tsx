import React, { useEffect, useState } from 'react';

import '@/pages/mypage/Mypage.css';
import Header from '@/components/header/Header';
import { AiOutlineHeart } from 'react-icons/ai';
import { User } from 'firebase/auth';
import Content from '@/components/Content';
import { Link } from 'react-router-dom';

const Mypage = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);

  // 사용자 정보를 상위 컴포넌트에서 관리
  const handleUserChange = (user: User | null) => {
    setUserInfo(user);
  };

  return (
    <>
      <Header onUserChange={handleUserChange} />
      <div className="mypageContainer">
        {userInfo && userInfo.displayName ? <h3>{userInfo.displayName} 님이 좋아하신 공연</h3> : <Link to="/" />}
        <Content />
      </div>
    </>
  );
};

export default Mypage;
