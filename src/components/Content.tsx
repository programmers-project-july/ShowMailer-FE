import React, { useCallback, useEffect, useState } from 'react';
import '@/components/Content.css';
import { useNavigate } from 'react-router-dom';
import { IPerformancePayload } from '@/hooks/usePerformances';

interface ContentProps {
  performances: IPerformancePayload[];
  selectedCategory: string;
  hasMore: boolean;
  onloadMore: () => void;
}

export const Content: React.FC<ContentProps> = ({ performances, selectedCategory, hasMore, onloadMore }) => {
  const navigate = useNavigate();

  // 선택된 카테고리로 필터링
  const filteredPerformances =
    selectedCategory === '전체' ? performances : performances.filter((p) => p.codename === selectedCategory);

  const handlePerformanceClick = (performance: IPerformancePayload) => {
    const { codename, title, date } = performance;
    const viewcodename = codename.split(`/`)[0];
    navigate(`/detail/${viewcodename}/${title}/${date}`);
  };

  return (
    <>
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
      </div>
      {hasMore ? (
        <button className="loadMoreBtn" onClick={onloadMore}>
          더 보기
        </button>
      ) : (
        <div className="noMoreData">더 이상 데이터가 없습니다.</div>
      )}
    </>
  );
};

export default Content;
