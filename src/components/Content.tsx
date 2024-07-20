import React, { useState } from 'react';
import '@/components/Content.css';
import { useNavigate } from 'react-router-dom';
import { IPerformancePayload, usePerformances } from '@/hooks/usePerformances';

interface ContentProps {
  filteredPerformances: IPerformancePayload[];
}

export const Content: React.FC<ContentProps> = ({ filteredPerformances }) => {
  const navigate = useNavigate();

  // const [filteredPerformances, setFilteredPerformances] = useState<IPerformancePayload[]>([]);
  // const { performances, isLoading, isError, refetch } = usePerformances();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (isError) {
  //   return (
  //     <div>
  //       Error fetching performances. <button onClick={() => refetch()}>Retry</button>
  //     </div>
  //   );
  // }
  // if (!Array.isArray(performances) || performances.length === 0) {
  //   return <div>No performances available.</div>;
  // }

  // 카테고리 선택에 따라 공연 데이터를 필터링
  // const handleCategoryChange = (category: string) => {
  //   if (category === '전체') {
  //     setFilteredPerformances(performances);
  //   } else {
  //     const filtered = performances.filter((performance) => performance.codename === category);
  //     setFilteredPerformances(filtered);
  //   }
  // };
  if (filteredPerformances.length === 0) {
    return <div>등록된 공연이 없습니다.</div>;
  }

  const handlePerformance = (performance: IPerformancePayload) => {
    const { CODENAME, TITLE, DATE } = performance;
    navigate(`/detail/${CODENAME}/${TITLE}/${DATE}`);
  };

  return (
    <div className="contentContainer">
      {filteredPerformances.map((performance, index) => (
        <div key={index} className="EventItem" onClick={() => handlePerformance(performance)}>
          <img src={performance.image} alt={performance.title} />
          <h3>{performance.title}</h3>
          <p>{performance.category}</p>
          <p>{performance.date}</p>
          <p>{performance.location}</p>
        </div>
      ))}
      {/* {filteredPerformances.length > 0 &&
        performances.map((performance) => (
          <div key={performance.id} className="EventItem" onClick={() => handlePerformance(performance)}>
            <img src={performance.image} alt={performance.title} />
            <h3>{performance.title}</h3>
            <p>{performance.category}</p>
            <p>{performance.date}</p>
            <p>{performance.location}</p>
          </div>
        ))} */}
      {/* {filteredPerformances.length > 0 ? (
        filteredPerformances.map((performance: IPerformancePayload, index: number) => (
          <div key={index} className="EventItem" onClick={() => handlePerformance(performance)}>
            <img src={performance.image} alt={performance.title} />
            <h3>{performance.title}</h3>
            <p>{performance.codename}</p>
            <p>{performance.date}</p>
            <p>{performance.place}</p>
          </div>
        ))
      ) : (
        <div>No performances found for the selected category.</div>
      )} */}
    </div>
  );
};

export default Content;
