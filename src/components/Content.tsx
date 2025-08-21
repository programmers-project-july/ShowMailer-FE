import React from 'react';
import '@/components/Content.css';
import { useNavigate } from 'react-router-dom';
import { IPerformancePayload } from '@/hooks/usePerformances';

interface ContentProps {
  performances: IPerformancePayload[];
  target?: React.RefObject<HTMLDivElement>;
  hasNextPage?: boolean;
  isLoading?: boolean;
  isFetchingNextPage?: boolean;
}

const Content: React.FC<ContentProps> = ({ performances, target, hasNextPage, isLoading, isFetchingNextPage }) => {
  const navigate = useNavigate();

  const handlePerformanceClick = (performance: IPerformancePayload) => {
    const { codename, title, date } = performance;
    const viewcodename = codename?.split(`/`)[0];
    navigate(`/detail/${viewcodename}/${title}/${date}`);
  };

  if (isLoading)
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );

  return (
    <>
      <div className="contentContainer">
        {performances.length === 0 ? (
          <p>등록된 공연이 없습니다.</p>
        ) : (
          performances.map((performance, index) => {
            const isTriggerElement =
              hasNextPage && performances.length > 7 && index === Math.floor(performances.length * 0.9);
            return (
              <div
                key={index}
                className="EventItem"
                onClick={() => handlePerformanceClick(performance)}
                ref={isTriggerElement ? target : null}
              >
                <img src={performance.image} alt={performance.title} />
                <h3>{performance.title}</h3>
                <p>{performance.codename}</p>
                <p>{performance.date}</p>
              </div>
            );
          })
        )}
      </div>
      {isFetchingNextPage && (
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}

      {!hasNextPage && performances.length > 0 && <div className="noMoreData">더이상 데이터가 없습니다.</div>}
    </>
  );
};

export default Content;
