import React, { useCallback, useEffect, useState } from 'react';
import '@/components/Content.css';
import { useNavigate } from 'react-router-dom';
import { IPerformancePayload } from '@/hooks/usePerformances';
import axios from 'axios';

interface ContentProps {
  performances: IPerformancePayload[];
  selectedCategory: string;
}

export const Content: React.FC<ContentProps> = ({ performances, selectedCategory }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const navigate = useNavigate();

  // console.log(performances);

  // 선택된 카테고리로 필터링
  const filteredPerformances =
    selectedCategory === '전체' ? performances : performances.filter((p) => p.codename === selectedCategory);

  const handlePerformanceClick = (performance: IPerformancePayload) => {
    const { codename, title, date } = performance;
    const startDate = date.split('~')[0];
    navigate(`/detail/${codename}/${title}/${startDate}`);
  };

  return (
    <div className="contentContainer">
      {filteredPerformances.length === 0 ? (
        <div>등록된 공연이 없습니다.</div>
      ) : (
        filteredPerformances.map((performance, index) => (
          <div key={index} className="EventItem" onClick={() => handlePerformanceClick(performance)}>
            <img src={performance.image} alt={performance.title} />
            <h3>{performance.title}</h3>
            <p>{performance.codename}</p>
            <p>{performance.date}</p>
          </div>
        ))
      )}
      {/* {hasMore && (
        <button className="loadMoreBtn" onClick={onLoadMore} >
          더 보기
        </button>
      )} */}
    </div>
  );
};

export default Content;
