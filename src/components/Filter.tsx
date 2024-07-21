import React, { useCallback, useEffect, useState } from 'react';
import '@/components/Filter.css';
import { useQuery } from '@tanstack/react-query';

interface FilterProps {
  categories: string[]; // 필터링할 카테고리 목록
  selectedCategory: string; // 현재 선택된 카테고리
  onCategoryChange: (category: string) => void; // 카테고리 변경 시 호출되는 함수
}

const Filter: React.FC<FilterProps> = ({ categories, selectedCategory, onCategoryChange }) => {
  const [isDropdownView, setDropdownView] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const handleDropdownToggle = () => {
    setDropdownView((prev) => !prev);
  };

  const handleDropdownItemClick = (category: string) => {
    onCategoryChange(category);
    setDropdownView(false);
  };

  // 드롭다운 외부 클릭 시 닫기 처리
  const handleDocumentClick = useCallback((event: MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      if (!event.target.closest('.filterContainer')) {
        setDropdownView(false);
      }
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, [handleDocumentClick]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    console.log(searchTerm);
  };

  return (
    <div className="filterContainer">
      <button className="dropdownBtn" onClick={handleDropdownToggle} style={{ border: '2px solid #efefef' }}>
        {selectedCategory} {isDropdownView ? '▲' : '▼'}
      </button>
      {isDropdownView && (
        <ul className="dropdownMenu">
          {categories.map((category: string) => (
            <li
              key={category}
              className={`dropdownItem ${selectedCategory === category ? 'selected' : ''}`}
              onClick={() => handleDropdownItemClick(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}

      <input
        type="text"
        className="searchInput"
        placeholder="제목 검색..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="searchBtn" onClick={handleSearch} style={{ backgroundColor: '#E78295', color: 'white' }}>
        검색
      </button>
    </div>
  );
};

export default Filter;
