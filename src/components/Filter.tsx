import React, { useEffect, useState } from 'react';
import '@/components/Filter.css';
import { useQuery } from '@tanstack/react-query';
import { IPerformancePayload, usePerformances } from '@/hooks/usePerformances';

interface FilterProps {
  onCategoryChange: (category: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onCategoryChange }) => {
  const [isDropdownView, setDropdownView] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchTerm, setSearchTerm] = useState('');

  const { performances, isLoading, isError, refetch } = usePerformances();

  useEffect(() => {
    if (performances) {
      const uniqueCategories = Array.from(
        new Set(performances.map((performance: IPerformancePayload) => performance.codename)),
      );
      setCategories(['전체', ...uniqueCategories]);
    }
  }, [performances]);

  useEffect(() => {
    onCategoryChange(selectedCategory);
  }, [selectedCategory, onCategoryChange]);

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

  const handleClickContainer = () => {
    setDropdownView(!isDropdownView);
  };

  const handleBlurContainer = () => {
    setDropdownView(false);
  };

  const handleDropdownItemClick = (category: string) => {
    setSelectedCategory(category);
    setDropdownView(false);
    return category;
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
          {selectedCategory ? selectedCategory : '전체'} {isDropdownView ? '▲' : '▼'}
        </button>
      </label>
      {isDropdownView && (
        <ul className="dropdown-menu">
          {categories.map((category: string) => (
            <li
              key={category}
              className={`dropdown-item ${selectedCategory === category ? 'selected' : ''}`}
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
        placeholder="제목 검색..."
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
