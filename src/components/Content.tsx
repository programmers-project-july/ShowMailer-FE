import React from 'react';
import '@/components/Content.css';
import { useNavigate } from 'react-router-dom';
import { IPerformancePayload, usePerformances } from '@/hooks/usePerformances';

interface ContentProps {
  selectedCategory: string;
}

export const Content: React.FC<ContentProps> = ({ selectedCategory }) => {
  const navigate = useNavigate();

  const { performances, isLoading, isError, refetch } = usePerformances();

  const handlePerformance = (performance: IPerformancePayload) => {
    const { CODENAME, TITLE, DATE } = performance;
    navigate(`/detail/${CODENAME}/${TITLE}/${DATE}`);
  };

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
  
  // 카테고리 선택에 따라 공연 데이터를 필터링
  const filteredPerformances = performances.filter((performance: IPerformancePayload) =>
    selectedCategory === '전체' || performance.codename === selectedCategory
  );

  return (
    <div className="content-container">
      {filteredPerformances.length > 0 ? (
        filteredPerformances.map((performance: IPerformancePayload) => (
          <div
            key={`${performance.title}-${performance.date}-${performance.codename}`}
            className="EventItem"
            onClick={() => handlePerformance(performance)}
          >
            <img src={performance.image} alt={performance.title} />
            <h3>{performance.title}</h3>
            <p>{performance.codename}</p>
            <p>{performance.date}</p>
            <p>{performance.place}</p>
          </div>
        ))
      ) : (
        <div>No performances found for the selected category.</div>
      )}
    </div>
  );
};

export default Content;
