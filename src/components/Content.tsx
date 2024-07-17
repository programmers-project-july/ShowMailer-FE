import React from 'react';
import '@/components/Content.css';

// 공연 데이터 타입 정의
export interface Tperformance {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  image: string;
}

//임의의 카테고리 더미 데이터
export const performances: Tperformance[] = [
  {
    id: 1,
    title: '공연 제목 1',
    category: '연극',
    date: '2024-07-18',
    location: '서울 예술의 전당',
    image: '/images/Event1.jpg',
  },
  {
    id: 2,
    title: '공연 제목 2',
    category: '무용',
    date: '2024-07-19',
    location: '세종문화회관',
    image: '/images/Event2.jpg',
  },
  {
    id: 3,
    title: '공연 제목 3',
    category: '콘서트',
    date: '2024-07-20',
    location: '예스24 라이브홀',
    image: '/images/Event3.jpg',
  },
  {
    id: 4,
    title: '공연 제목 4',
    category: '전시/미술',
    date: '2024-07-21',
    location: '국립현대미술관',
    image: '/images/Event4.jpg',
  },
  {
    id: 5,
    title: '공연 제목 5',
    category: '국악',
    date: '2024-07-22',
    location: '국립극장',
    image: '/images/Event5.jpg',
  },
  {
    id: 6,
    title: '공연 제목 6',
    category: '뮤지컬/오페라',
    date: '2024-07-23',
    location: '충무아트센터',
    image: '/images/Event6.jpg',
  },
  {
    id: 7,
    title: '공연 제목 7',
    category: '기타',
    date: '2024-07-24',
    location: '홍익대학교 대학로 아트센터',
    image: '/images/Event7.jpg',
  },
  {
    id: 8,
    title: '공연 제목 8',
    category: '영화',
    date: '2024-07-25',
    location: '메가박스 강남',
    image: '/images/Event8.jpg',
  },
];

const Content: React.FC = () => {
  return (
    <div className="content-container">
      {performances.map((performance) => (
        <div key={performance.id} className="Event-item">
          <h2>{performance.title}</h2>
          <p>{performance.category}</p>
          <p>{performance.date}</p>
          <p>{performance.location}</p>
        </div>
      ))}
    </div>
  );
};

export default Content;
