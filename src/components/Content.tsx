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

  // 선택된 카테고리로 필터링
  const filteredPerformances =
    selectedCategory === '전체' ? performances : performances.filter((p) => p.codename === selectedCategory);

  const handlePerformanceClick = (performance: IPerformancePayload) => {
    const { CODENAME, TITLE, DATE } = performance;
    navigate(`/detail/${CODENAME}/${TITLE}/${DATE}`);
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
