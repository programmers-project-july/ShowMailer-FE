import React, { useCallback, useEffect, useState } from 'react';
import '@/components/Filter.css';

interface FilterProps {
  categories: string[]; // 필터링할 카테고리 목록
  selectedCategory: string; // 현재 선택된 카테고리
  onCategoryChange: (category: string) => void; // 카테고리 변경 시 호출되는 함수
  onSearchChange: (event: string) => void; // 검색어 변경 시 호출되는 함수
}

const Filter: React.FC<FilterProps> = ({ categories, selectedCategory, onCategoryChange, onSearchChange }) => {
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
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handleSearch = () => {
    onSearchChange(searchTerm); // 버튼 클릭 시 상위 컴포넌트에 검색어 전달
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch(); // 엔터 키 입력 시 검색어 전달
    }
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
        onChange={handleSearchChange} // 상태 업데이트
        onKeyDown={handleKeyDown} // 엔터 키 입력 감지
      />
      <button className="searchBtn" onClick={handleSearch} style={{ backgroundColor: '#E78295', color: 'white' }}>
        검색
      </button>
    </div>
  );
};

export default Filter;
