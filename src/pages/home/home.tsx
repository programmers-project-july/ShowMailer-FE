import React from "react";

import './home.css';
import Header from "@/components/header/header";


const home = () => {
  return (
    <div className="appContainer">
      <Header />
      <div className="banner">소개</div>
      <div className="container">
        <div className="filter"> 필터, 검색 </div>
        <div className="content"></div>
      </div>
    </div>
  );
};

export default home;
