import React, { useState } from 'react';
import '@/components/Filter.css';

//임의의 카테고리 더미 데이터
export const category: string[] = [
  '전체',
  '교육/체험',
  '국악',
  '독주/독창회',
  '무용',
  '뮤지컬/오페라',
  '연극',
  '영화',
  '전시/미술',
  '축제',
  '콘서트',
  '클래식',
  '기타',
];

const Filter: React.FC = () => {
  const [isDropdownView, setDropdownView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(category[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setDropdownView(false);
    }, 200);
  };

  const handleDropdownItemClick = (category: string) => {
    setSelectedCategory(category); // 선택된 카테고리 업데이트
    setDropdownView(false); // 드롭다운 닫기
    console.log(`Selected category: ${category}`);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log(searchTerm);
  };

  return (
    <div className="filter-container" onBlur={handleBlurContainer}>
      <label onClick={handleClickContainer}>
        <button className="dropdown-btn" style={{ border: '2px solid #efefef' }}>
          {selectedCategory ? selectedCategory : category[0]} {isDropdownView ? '▲' : '▼'}
        </button>
      </label>
      {isDropdownView && (
        <ul className="dropdown-menu">
          {category.map((category, index) => (
            <li
              key={index}
              className={`dropdown-item  ${selectedCategory === category ? 'selected' : ''}`}
              onClick={() => handleDropdownItemClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        className="search-input"
        placeholder="검색..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="search-btn" onClick={handleSearch} style={{ backgroundColor: '#E78295', color: 'white' }}>
        검색
      </button>
    </div>
  );
};

export default Filter;
